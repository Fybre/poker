class Board {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext("2d");
  }

  // Initialise the deck for a new game
  init() {
    this.startGameLoop();
  }

  // start a new game
  startNewGame(noPlayers) {
    this.players = [];
    this.addPlayers(noPlayers);
    this.communityHand = new Player({
      playerType: Types.playerTypes.Community,
      board: this,
    });
  }

  // start a new hand
  startNewHand() {
    this.deck = new Deck({ board: this });
    this.communityHand.clearHand();
    this.players.forEach((player) => {
      player.clearHand();
    });
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
    let addedPlayers = 0;
    // iterate through all player types, find the ones that are either ai or player and add them
    for (let p in Types.playerTypes) {
      if (Types.playerTypes[p].type === "ai" && addedPlayers < noPlayers) {
        this.players.push(
          new Player({ playerType: Types.playerTypes[p], board: this })
        );
        addedPlayers++;
      }
      // add human player
      if (Types.playerTypes[p].type === "player") {
        this.players.push(
          new Player({ playerType: Types.playerTypes[p], board: this })
        );
      }
    }
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
    this.players.forEach((player) => {
      player.hand.forEach((card) => {
        card.isFaceDown = false;
      });
      let combinedHand = [].concat(this.communityHand.hand, player.hand);
      findBestHand(combinedHand, 5);
    });
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
      this.players.forEach((player) => {
        player.draw(this.ctx);
      });
    }
    //draw community hand
    if (this.communityHand) {
      this.communityHand.draw(this.ctx);
    }
  }
}
