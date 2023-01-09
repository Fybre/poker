class Board {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext("2d");
    this.dealer = null;
    this.currentPlayer = null;
  }

  // Initialise the deck for a new game
  init() {
    this.startGameLoop();
  }

  // start a new game
  startNewGame(noPlayers) {
    this.dealer = null;
    this.players = [];
    this.addPlayers(noPlayers);
    this.communityHand = new Player({
      playerType: Types.playerTypes.Community,
      board: this,
    });
    this.phase = Types.dealTypes.Hole;
  }

  // start a new hand
  startNewHand() {
    this.deck = new Deck({ board: this });
    this.communityHand.clearHand();
    this.players.forEach((player) => {
      player.clearHand();
    });
    this.setDealer();
    this.currentPlayer = this.dealer;
  }

  setDealer() {
    if (this.dealer != null) {
      this.dealer = this.dealer + 1 < this.players.length ? this.dealer + 1 : 0;
    } else {
      this.dealer = Math.floor(Math.random() * this.players.length);
    }
  }

  // start the game loop
  startGameLoop() {
    const gameLoop = () => {
      //game loop - this runs continually

      // NOT COMPLETED - determines the current game status and processes accordingly
      switch (this.gamestatus) {
        case Types.gameStatuses.Deal:
          // initial deal
          this.gamestatus = Types.gameStatuses.Wait;
          break;
      }

      // redraw the board
      this.draw();
      // run the game loop routine over again
      window.requestAnimationFrame(() => {
        gameLoop();
      });
    };

    // initial call to gameloop
    gameLoop();
  }

  // deal cards to all players
  deal(dealType) {
    // determine the deal type = hold, flop, turn or river
    switch (dealType) {
      case Types.dealTypes.Hole:
        this.players.forEach((player) => {
          [1, 2].forEach(() => {
            player.addCard(this.deck.deal());
          });
          if (player.playerType === Types.playerTypes.Player) {
            player.hand.forEach((card) => {
              card.isFaceDown = false;
            });
          }
        });
        break;
      case Types.dealTypes.Flop:
        [1, 2, 3].forEach(() =>
          this.communityHand.addCard(this.deck.deal(), false)
        );
        break;
      case Types.dealTypes.Turn:
        this.communityHand.addCard(this.deck.deal(), false);
        break;
      case Types.dealTypes.River:
        this.communityHand.addCard(this.deck.deal(), false);
        break;
    }
  }

  // add players to the board - parameter is no of players to add. also adds the human player
  addPlayers(noPlayers) {
    for (let i = 1; i <= noPlayers; i++) {
      this.players.push(
        new Player({
          playerType: Types.playerTypes["AI" + i],
          board: this,
        })
      );
    }
    this.players.push(
      new Player({ playerType: Types.playerTypes.Player, board: this })
    );
  }

  handleEvents(e) {
    switch (e.action) {
      case "newgame":
        this.startNewGame(e.noPlayers - 0);
      //fall through
      case "newhand":
        this.startNewHand();
        break;
      case Types.dealTypes.Hole:
        this.deal(Types.dealTypes.Hole);
        break;
      case Types.dealTypes.Flop:
        this.deal(Types.dealTypes.Flop);
        break;
      case Types.dealTypes.Turn:
        this.deal(Types.dealTypes.Turn);
        break;
      case Types.dealTypes.River:
        this.deal(Types.dealTypes.River);
        break;
      case "getresult":
        this.getResult();
        break;
    }
  }

  getResult() {
    for (const player of this.players) {
      for (const card of player.hand) {
        card.isFaceDown = false;
      }
      const combinedHand = [].concat(this.communityHand.hand, player.hand);
      findBestHand(combinedHand, 5);
    }
    // this.players.forEach((player) => {
    //   player.hand.forEach((card) => {
    //     card.isFaceDown = false;
    //   });
    //   let combinedHand = [].concat(this.communityHand.hand, player.hand);
    //   findBestHand(combinedHand, 5);
    // });
  }

  playSoundAsync(url) {
    new Audio(url).play();
  }

  // routine to draw the board and elements on it
  draw() {
    // clear board
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //draw card deck image
    if (this.deck) {
      this.deck.draw(this.ctx);
    }

    // draw cards
    if (this.players) {
      this.players.forEach((player, index) => {
        player.draw(
          this.ctx,
          index == this.currentPlayer,
          index == this.dealer
        );
      });
    }

    //draw community hand
    if (this.communityHand) {
      this.communityHand.draw(this.ctx);
    }
  }
}
