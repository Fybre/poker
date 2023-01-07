var result = new Array();
function findBestHand(hand, handSize) {
  //let handCombinations = getCombinations(hand, handSize);
  let tempHand = sortHand(hand);
  const combinations = getCombinations(tempHand, handSize);
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

function sortHand(hand) {
  for (let i = 1; i < hand.length; i++) {
    let value = hand[i];
    let j = i - 1;
    while (j >= 0 && value.value < hand[j].value) {
      hand[j + 1] = hand[j];
      j -= 1;
    }
    hand[j + 1] = value;
  }
  return hand;
}
