class Player {
  constructor(config) {
    this.playerType = config.playerType;
    this.hand = [];
    this.playerMoney = config.playerMoney || 100.0;
    this.position = config.position || { x: 0, y: 0 };
    this.board = config.board;
    this.handLocations = this.playerType.positions;
  }

  update() {}

  setName(name) {
    this.playerType.name = name;
  }

  addCard(card, faceDown = true) {
    card.dealTo(
      Types.playerTypes.Deck.positions[0],
      this.handLocations[this.hand.length]
    );
    card.isFaceDown = faceDown;
    this.hand.push(card);
  }

  clearHand() {
    this.hand = [];
  }

  drawCurrentPlayerMarker(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#0D4D00";
    ctx.strokeStyle = "#000";
    ctx.arc(
      this.playerType.centerPosition.x,
      this.playerType.centerPosition.y,
      Types.cardSize.height,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.stroke();
  }

  draw(ctx) {
    this.update();

    //draw text
    ctx.textAlign = "center";
    ctx.font = "40px Arial";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "#FFF";
    ctx.fillText(
      this.playerType.name +
        (this.playerType === Types.playerTypes.Community
          ? ""
          : " - $" + this.playerMoney),
      this.playerType.centerPosition.x,
      this.playerType.centerPosition.y -
        Types.cardSize.height / 2 -
        Types.canvasSize.spacer
    );
    this.hand.forEach((card) => {
      card.draw(ctx);
    });
  }
}
