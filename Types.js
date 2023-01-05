// Commonly used types throughout the game

class Types {
  //game status
  static gameStatuses = { Wait: 0, Deal: 1 };

  // canvas size details used for setting up locations for players
  static canvasSize = { width: 3150, height: 1575, spacer: 20 };
  // size of each card image
  static cardSize = { width: 225, height: 315 };

  // The different player types and associated details such as name, where the text is located and where
  // each of the cards are located
  static playerTypes = {
    AI1: {
      name: "Computer 1",
      textPosition: {
        x: Types.canvasSize.width / 2,
        y: Types.canvasSize.height * 0.08,
      },
      positions: [
        {
          x:
            Types.canvasSize.width / 2 -
            Types.cardSize.width -
            Types.canvasSize.spacer / 2,
          y: Types.canvasSize.height * 0.08,
        },
        {
          x: Types.canvasSize.width / 2 + Types.canvasSize.spacer / 2,
          y: Types.canvasSize.height * 0.08,
        },
      ],
    },
    AI2: {
      name: "Computer 2",
      textPosition: {
        x: Types.cardSize.width * 2 + Types.canvasSize.spacer,
        y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
      },
      positions: [
        {
          x: Types.cardSize.width,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
        {
          x:
            Types.cardSize.width +
            Types.cardSize.width +
            Types.canvasSize.spacer,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
      ],
    },
    Community: {
      name: "Community Hand",
      textPosition: {
        x: Types.canvasSize.width / 2,
        y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
      },
      positions: [
        {
          x:
            Types.canvasSize.width / 2 -
            Types.cardSize.width / 2 -
            Types.canvasSize.spacer * 2 -
            Types.cardSize.width * 2,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
        {
          x:
            Types.canvasSize.width / 2 -
            Types.cardSize.width / 2 -
            Types.canvasSize.spacer -
            Types.cardSize.width,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
        {
          x: Types.canvasSize.width / 2 - Types.cardSize.width / 2,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
        {
          x:
            Types.canvasSize.width / 2 +
            Types.cardSize.width / 2 +
            Types.canvasSize.spacer,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
        {
          x:
            Types.canvasSize.width / 2 +
            Types.cardSize.width / 2 +
            2 * Types.canvasSize.spacer +
            Types.cardSize.width,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
      ],
    },
    AI3: {
      name: "Computer 3",
      textPosition: {
        x: Types.canvasSize.width - 2 * Types.cardSize.width,
        y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
      },
      positions: [
        {
          x:
            Types.canvasSize.width -
            3 * Types.cardSize.width -
            Types.canvasSize.spacer,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
        {
          x: Types.canvasSize.width - 2 * Types.cardSize.width,
          y: Types.canvasSize.height * 0.5 - Types.cardSize.height / 2,
        },
      ],
    },
    Player: {
      name: "You",
      textPosition: {
        x: Types.canvasSize.width / 2,
        y: Types.canvasSize.height * 0.7,
      },
      positions: [
        {
          x:
            Types.canvasSize.width / 2 -
            Types.cardSize.width -
            Types.canvasSize.spacer / 2,
          y: Types.canvasSize.height * 0.7,
        },
        {
          x: Types.canvasSize.width / 2 + Types.canvasSize.spacer / 2,
          y: Types.canvasSize.height * 0.7,
        },
      ],
    },
    Deck: {
      name: "Deck",
      textPosition: {
        x: Types.canvasSize.width / 2,
        y: Types.canvasSize.height * 0.7,
      },
      positions: [
        {
          x: Types.canvasSize.width * 0.015,
          y: Types.canvasSize.height * 0.025,
        },
      ],
    },
  };
}
