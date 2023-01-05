// handles actually drawing a card image

class CardSprite {
  static XFrames = 14;
  static YFrames = 4;
  static FaceDownLocation = { x: 13, y: 0 };
  static shadowOffset = 10;

  constructor() {
    this.cardImage = new Image();
    this.cardImage.onload = () => {
      this.imageLoaded = true;
    };
    this.shadowImage = new Image();
    this.shadowImage.onload = () => {
      this.shadowImageLoaded = true;
    };

    this.cardImage.src = "./img/cards.png";
    this.shadowImage.src = "./img/cardshadow.png";
  }

  getCardWidth() {
    return this.cardImage.width / CardSprite.XFrames;
  }

  getCardHeight() {
    return this.cardImage.height / CardSprite.YFrames;
  }

  drawCard({ ctx: ctx, card: card }) {
    //draw shadow
    this.shadowImageLoaded &&
      ctx.drawImage(
        this.shadowImage,
        0,
        0,
        this.getCardWidth(),
        this.getCardHeight(),
        card.position.x + CardSprite.shadowOffset,
        card.position.y + CardSprite.shadowOffset,
        this.getCardWidth(),
        this.getCardHeight()
      );

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
  }

  // getCard(cardSuite, cardValue) {
  //   let dCanvas = document.createElement("canvas");
  //   let dctx = dCanvas.getContext("2d");
  //   if (this.imageLoaded) {
  //     dCanvas.width = this.getCardWidth();
  //     dCanvas.height = this.getCardHeight();

  //     dctx.drawImage(
  //       this.cardImage,
  //       (cardValue - 1) * dCanvas.width,
  //       cardSuite * dCanvas.height,
  //       dCanvas.width,
  //       dCanvas.height,
  //       0,
  //       0,
  //       dCanvas.width,
  //       dCanvas.height
  //     );
  //     return dCanvas;
  //   }
  // }
}
