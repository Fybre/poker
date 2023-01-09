class handResult {
  static result = {
    RoyalFlush: {
      name: "Royal Flush",
      score: 10,
    },
    StraightFlush: {
      name: "Straight Flush",
      score: 9,
    },
    FourOfAKind: {
      name: "Four of a Kind",
      score: 8,
    },
    FullHouse: {
      name: "Full House",
      score: 7,
    },
    Flush: {
      name: "Flush",
      score: 6,
    },
    Straight: {
      name: "Straight",
      score: 5,
    },
    ThreeOfAKind: {
      name: "Three of a Kind",
      score: 4,
    },
    TwoPair: {
      name: "Two Pair",
      score: 3,
    },
    OnePair: {
      name: "One Pair",
      score: 2,
    },
    HighCard: {
      name: "High Card",
      score: 1,
    },
  };

  constructor() {}
}

function findBestHand(hand, handSize) {
  const combinations = getCombinations(hand, handSize);
  const sorted = [];
  combinations.forEach((hand) => sorted.push(sortHand(hand)));
}

function scoreHand(hand) {}

function getCombinations(hand, handSize, current = [], result = []) {
  if (current.length === handSize) {
    result.push(current);
    return;
  }
  for (let i = 0; i < hand.length; i++) {
    getCombinations(
      hand.slice(i + 1),
      handSize,
      current.concat(hand[i]),
      result
    );
  }
  return result;
}

function isRoyalFlush(sortedHand) {
  if (isAllSameSuite(sortedHand) && sortedHand[0].getCardValue() == 10) {
    return true;
  }
  return false;
}

function isStraightFlush(sortedHand) {
  return isAllSameSuite(sortedHand) && isStraight(sortedHand);
}

function isFourOfAKind(sortedHand) {}

function isFullHouse(sortedHand) {}

function isFlush(sortedhand) {
  return isAllSameSuite(sortedHand);
}

function isStraight(sortedHand) {}

function isThreeOfAKind(sortedHand) {}

function isTwoPair(sortedHand) {}

function isOnePair(sortedhand) {}

function getHighestCard(sortedhand) {
  return sortedhand[sortedHand.length - 1];
}



function GetGroupedCardValues(hand)
{
  valueObject = {};
  for(let card of hand)
  {
    if (valueObject[card.getCardValue()]){
      valueObject[card.getCardValue()++];
    }
    else
    {
      valueObject[card.getCardValue()] = 1;
    }
  }
  return valueObject;
}

function isAllSameSuite(hand) {
  let suite = hand[0].suite;
  for (let i = 1; i < hand.length; i++) {
    if (suite !== hand[i].suite) {
      return false;
    }
  }
  return true;
}

function sortHand(hand) {
  for (let i = 1; i < hand.length; i++) {
    let current = hand[i];
    let j = i - 1;
    while (j >= 0 && current.getCardValue() < hand[j].getCardValue()) {
      hand[j + 1] = hand[j];
      j -= 1;
    }
    hand[j + 1] = current;
  }
  return hand;
}
