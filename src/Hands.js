var result = new Array();
function findBestHand(hand, handSize) {
  //let handCombinations = getCombinations(hand, handSize);
  const combinations = getCombinations(hand, handSize);
  console.log(combinations);
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
