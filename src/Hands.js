function findBestHand(hand, handSize) {
  const combinations = getCombinations(hand, handSize);
  const sorted = [];
  combinations.forEach((hand) => sorted.push(sortHand(hand)));

  sorted.forEach((hand) => {
    if (isAllSameSuite(hand)) {
      console.log("FLUSH!");
    }
  });
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
