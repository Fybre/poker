class Player {
  constructor(config) {
    this.playerType = config.playerType;
    this.hand = [];
    this.playerMoney = config.playerMoney || 100.0;
    this.position = config.position || { x: 0, y: 0 };
    this.board = config.board;
    this.handLocations = this.playerType.positions;
    this.playerLabel = new TextLabel({
      text: this.playerType.name,
      position: {
        x: this.playerType.centerPosition.x,
        y:
          this.playerType.centerPosition.y -
          Types.cardSize.height / 2 -
          Types.canvasSize.spacer,
      },
      animation: { type: TextLabel.animationType.grow, textSize: 0 },
    });
    this.statusLabel = new TextLabel({
      text: "",
      position: {
        x: this.playerType.centerPosition.x,
        y: this.playerType.centerPosition.y,
      },
      fontSize: 60,
      colour: "#F00",
    });
    this.playerStatus = config.status || Types.playerStatus.inPlay;
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
    ctx.save();
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
    ctx.restore();
  }

  draw(ctx, isCurrentPlayer = false, isDealer = false) {
    this.update();

    if (isCurrentPlayer) {
      this.drawCurrentPlayerMarker(ctx);
    }

    //draw label
    this.playerLabel.text =
      this.playerType.name +
      (this.playerType === Types.playerTypes.Community
        ? ""
        : " - $" + this.playerMoney);
    this.playerLabel.textColour = isDealer ? "#FF0" : "#FFF";
    this.playerLabel.draw(ctx);

    this.statusLabel.text = this.playerStatus;
    this.statusLabel.draw(ctx);

    this.hand.forEach((card) => {
      card.draw(ctx);
    });
  }
}
