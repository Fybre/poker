class Board {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext("2d");
    this.players = [];
    this.deck = new Deck({ board: this });
    this.gamestatus = Types.gameStatuses.Wait;
  }

  init() {
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

  deal() {
    // deal cards to all players
    this.players.forEach((player) => {
      player.addCard(this.deck.deal());
      player.addCard(this.deck.deal());
      if (player.playerType === Types.playerTypes.Player) {
        player.hand.forEach((card) => {
          card.isFaceDown = false;
        });
      }
    });
  }

  // add players to the board - parameter is no of players to add. also adds the human player
  addPlayers(noPlayers) {
    // clear players first
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

  onClick(e) {
    switch (e.action) {
      case "start":
        this.addPlayers(e.noPlayers - 0);
        break;
      case "deal":
        this.deal();
        break;
    }
  }

  playSoundAsync(url) {
    new Audio(url).play();
  }

  play() {}

  update() {}

  // routine to draw the board and elements on it
  draw() {
    // clear board
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //draw deck image
    this.deck.draw(ctx);
    // draw cards

    this.players.forEach((player) => {
      player.draw(ctx);
    });
  }
}
