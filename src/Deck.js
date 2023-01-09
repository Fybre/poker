class Deck {
  constructor(config) {
    this.board = config.board;
    this.cardSpriteObject = new CardSprite();
    this.deck = [];
    this.createDeck();
    this.shuffle();
    this.image = new Image();
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.image.src = "./img/deck.png";
    this.position = Types.playerTypes.Deck.positions[0];
  }

  createDeck() {
    for (const cardSuite in Card.cardSuites) {
      for (const cardValue in Card.cardValues) {
        this.deck.push(
          new Card({
            suite: cardSuite,
            value: cardValue,
            cardSpriteObject: this.cardSpriteObject,
          })
        );
      }
    }
  }

  shuffle() {
    for (let i = 0; i < this.deck.length; i++) {
      let j = Math.floor(Math.random() * this.deck.length); // get a random number
      let temp = this.deck[i]; // get the value of the current card in the loop
      this.deck[i] = this.deck[j]; // swap it with the random card we chose
      this.deck[j] = temp;
    }
  }

  deal() {
    var result = this.deck.pop();
    this.board.playSoundAsync("./snd/dealcard.wav");
    return result;
  }

  draw(ctx) {
    this.imageLoaded &&
      ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
