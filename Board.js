class Board {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext("2d");
  }

  // Initialise the deck for a new game
  init() {
    this.players = [];
    this.communityHand = new Player({
      playerType: Types.playerTypes.Community,
      board: this,
    });
    this.deck = new Deck({ board: this });
    this.gamestatus = Types.gameStatuses.Wait;
    this.startGameLoop();
  }

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

  deal(dealType) {
    // deal cards to all players
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
        console.log("turn");
        this.communityHand.addCard(this.deck.deal(), false);
        break;
      case Types.dealTypes.River:
        this.communityHand.addCard(this.deck.deal(), false);
        break;
    }
  }

  // add players to the board - parameter is no of players to add. also adds the human player
  addPlayers(noPlayers) {
    let pArray = [
      Types.playerTypes.Player,
      Types.playerTypes.AI1,
      Types.playerTypes.AI2,
      Types.playerTypes.AI3,
    ];
    for (let i = 0; i < noPlayers + 1; i++) {
      let player = new Player({ playerType: pArray[i], board: this });
      this.players.push(player);
    }
  }

  onButtonClick(e) {
    console.log(e);
    switch (e.action) {
      case "start":
        this.init();
        this.addPlayers(e.noPlayers - 0); // - 0 coerces to number
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
    this.deck.draw(ctx);
    // draw cards
    this.players.forEach((player) => {
      player.draw(ctx);
    });
    //draw community hand
    this.communityHand.draw(ctx);
  }
}
