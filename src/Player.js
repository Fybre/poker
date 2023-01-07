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

  draw(ctx) {
    this.update();
    ctx.textAlign = "center";
    ctx.font = "40px Arial";
    ctx.textBaseline = "bottom";
    ctx.fillText(
      this.playerType.name +
        (this.playerType === Types.playerTypes.Community
          ? ""
          : " - $" + this.playerMoney),
      this.playerType.textPosition.x,
      this.playerType.textPosition.y
    );
    this.hand.forEach((card) => {
      card.draw(ctx);
    });
  }
}
