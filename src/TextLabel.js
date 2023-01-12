class TextLabel {
  static animationType = { none: 0, grow: 1, glow: 2, breathe: 3, fade: 4 };

  constructor({
    text: text,
    position: position,
    font: font,
    fontSize: fontSize,
    colour: colour,
    textAlignment: textAlignment,
    animation: animation,
  }) {
    this.text = text;
    this.position = position;
    this.textFont = "Arial" || font;
    this.textSize = fontSize || 40;
    this.textColour = colour || "#FFF";
    this.alignment = textAlignment || "center";
    this.currentTextSize = this.textSize;
    this.animation = animation;
  }

  isComplete() {
    return this.animation === null;
  }

  setAnimation({ animation }) {
    this.animation = animation;
  }

  update() {
    //update routine
    if (this.animation) {
      switch (this.animation.type) {
        case TextLabel.animationType.grow:
          if (this.animation.textSize < this.textSize) {
            this.animation.textSize++;
            this.currentTextSize = this.animation.textSize;
          } else {
            this.animation = null;
          }
          break;
        case TextLabel.animationType.glow:
          break;
        case TextLabel.animationType.breathe:
          if (
            this.currentTextSize > this.animation.maxSize ||
            this.currentTextSize < this.animation.minSize
          ) {
            this.animation.step = -1 * this.animation.step;
          }
          this.currentTextSize = this.currentTextSize + this.animation.step;
          break;
        case TextLabel.animation.none: {
          this.currentTextSize = this.textSize;
          this.animation = null;
        }
      }
    }
  }

  draw(ctx) {
    this.update();
    ctx.save();
    // ctx.font = this.textFont + " " + this.currTextSize + "px";
    ctx.font = this.currentTextSize + "px " + this.textFont;
    ctx.fillStyle = this.textColour;
    ctx.textAlign = this.alignment;
    ctx.fillText(this.text, this.position.x, this.position.y);
    ctx.restore();
  }
}
