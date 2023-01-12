// handles actually drawing a card image

class CardSprite {
  static XFrames = 14;
  static YFrames = 4;
  static FaceDownLocation = { x: 13, y: 0 };

  constructor() {
    this.cardImage = new Image();
    this.cardImage.onload = () => {
      this.imageLoaded = true;
    };

    this.cardImage.src = "./img/cards.png";
  }

  getCardWidth() {
    return this.cardImage.width / CardSprite.XFrames;
  }

  getCardHeight() {
    return this.cardImage.height / CardSprite.YFrames;
  }

  drawCard({ ctx: ctx, card: card }) {
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = "black";
    ctx.globalAlpha = 0.4;
    this.imageLoaded &&
      ctx.drawImage(
        this.cardImage,
        card.isFaceDown
          ? CardSprite.FaceDownLocation.x * this.getCardWidth()
          : (Card.cardValues[card.value] - 1) * this.getCardWidth(),
        card.isFaceDown
          ? CardSprite.FaceDownLocation.y * this.getCardHeight()
          : Card.cardSuites[card.suite] * this.getCardHeight(),
        this.getCardWidth(),
        this.getCardHeight(),
        card.position.x,
        card.position.y,
        this.getCardWidth(),
        this.getCardHeight()
      );
    ctx.restore();
  }
}
