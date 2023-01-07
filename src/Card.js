// class to represent a card. Uses cardsprite for drawing
class Card {
  static cardSuites = {
    Hearts: 0,
    Spades: 1,
    Diamonds: 2,
    Clubs: 3,
  };

  static cardValues = {
    Ace: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
  };

  constructor({ suite, value, cardSpriteObject }) {
    this.suite = suite;
    this.value = value;
    this.cardSpriteObject = cardSpriteObject;
    this.isFaceDown = true;
    this.boardPosition = null;
    this.position = null;
  }

  dealTo(startPos, endPos) {
    this.position = { x: startPos.x, y: startPos.y };
    this.boardPosition = { x: endPos.x, y: endPos.y };
  }

  getCardValue() {
    return Card.cardValues[this.value];
  }

  update() {
    const hyp = 80;
    //move towards the boardposition
    if (JSON.stringify(this.position) === JSON.stringify(this.boardPosition)) {
      return;
    }
    let a = Math.abs(this.position.x - this.boardPosition.x);
    let o = Math.abs(this.position.y - this.boardPosition.y);
    let theta = Math.atan(o / a);
    let yDelta = Math.sin(theta) * hyp;
    let xDelta = Math.cos(theta) * hyp;

    if (this.boardPosition.x > this.position.x) {
      this.position.x =
        this.position.x + xDelta > this.boardPosition.x
          ? this.boardPosition.x
          : this.position.x + xDelta;
    } else {
      this.position.x =
        this.position.x - xDelta < this.boardPosition.x
          ? this.boardPosition.x
          : this.position.x - xDelta;
    }
    if (this.boardPosition.y > this.position.y) {
      this.position.y =
        this.position.y + yDelta > this.boardPosition.y
          ? this.boardPosition.y
          : this.position.y + yDelta;
    } else {
      this.position.y =
        this.position.y - yDelta < this.boardPosition.y
          ? this.boardPosition.y
          : this.position.y - yDelta;
    }
  }

  draw(ctx) {
    this.update();
    this.cardSpriteObject.drawCard({
      ctx: ctx,
      card: this,
    });
  }
}
