class Board {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext("2d");
    this.dealer = null;
    this.currentPlayer = null;
    this.rAF = 0;
    this.animations = [];
    this.gameStatus = Types.gameStatus.None;
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
    this.gameStatus = Types.gameStatus.PreHole;
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
      console.log("player " + player.playerType.name);
      findBestHand(combinedHand, 5);
    }
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

    // draw animations
    this.animations = this.animations.filter((a) => !a.isComplete);
    for (let a of this.animations) {
      a.draw();
    }
  }

  // start the game loop
  startGameLoop() {
    let start = performance.now(); // the start time
    let self = this; // store the 'this' context outside of the gameloop so we don't need to constantly rebind it

    function gameLoop(timeStamp) {
      let delta = timeStamp - start;

      switch (self.gameStatus) {
        case Types.gameStatus.PreHole:
          // do big blind
          // do small blind
          self.gameStatus = Types.gameStatus.Hole;
          break;
        case Types.gameStatus.Hole:
          // do player actions
          break;
        case Types.gameStatus.Flop:
          break;
        case Types.gameStatus.Turn:
          break;
        case Types.gameStatus.River:
          break;
        case Types.gameStatus.Finale:
          break;
      }

      self.draw(delta);
      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }
}
