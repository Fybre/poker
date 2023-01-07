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
        console.log("turn");
        this.communityHand.addCard(this.deck.deal(), false);
        break;
      case Types.dealTypes.River:
        this.communityHand.addCard(this.deck.deal(), false);
        break;
    }
  }

  addPlayers(noPlayers) {
    // add players to the board - parameter is no of players to add. also adds the human player
    let addedPlayers = 0;
    for (let p in Types.playerTypes) {
      if (Types.playerTypes[p].type === "ai" && addedPlayers < noPlayers) {
        this.players.push(
          new Player({ playerType: Types.playerTypes[p], board: this })
        );
        addedPlayers++;
      }
      if (Types.playerTypes[p].type === "player") {
        this.players.push(
          new Player({ playerType: Types.playerTypes[p], board: this })
        );
      }
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
      case "getresult":
        this.getResult();
        break;
    }
  }

  getResult() {
    console.log("getresult");
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
    this.deck.draw(ctx);

    // draw cards
    this.players.forEach((player) => {
      player.draw(ctx);
    });

    //draw community hand
    this.communityHand.draw(ctx);
  }
}
