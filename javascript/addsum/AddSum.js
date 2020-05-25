/***
 * @param {number[]} numbers
 * @param {number} target
 */
var twoSum = function (numbers, target) {
  for (let index = 0; index < numbers.length; index++) {
    const item = numbers[index];
    const matchedTargetIndexes = findIndexMatchesTarget({
      currentIteration: { item: item, index: index },
      numbers: numbers,
      target: target,
    });
    if (matchedTargetIndexes.length > 0) {
      return matchedTargetIndexes;
    }
  }
};

var findIndexMatchesTarget = function (props) {
  const currentIteration = props.currentIteration;
  const target = props.target;
  var total = currentIteration.item;
  let matchedTargetIndexes = [];
  let potentialTargetIndexes = [];
  potentialTargetIndexes.push(currentIteration.index);

  for (var index = 0; index < props.numbers.length; index++) {
    const item = props.numbers[index];
    if (itemExactlyMatchesTarget(item, target)) {
      //edge case: when item matches exactly the target, process it first!
      //not processing this first will result in wrong output.
      //reset matchedTargetIndexes & potentialTargetIndexes as we want to ignore all items previously added.
      matchedTargetIndexes = [];
      potentialTargetIndexes = [];
      matchedTargetIndexes.push(index);
      break;
    }
    if (index === currentIteration.index) {
      //special case: avoid adding value in-here, such as total or push caller's index
      continue;
    }

    if (doesInputMatchTarget(item, total, target)) {
      potentialTargetIndexes.push(index);
      matchedTargetIndexes = matchedTargetIndexes.concat(
        potentialTargetIndexes
      );

      break;
    } else if (total > target || item + total > target) {
      //resets the potential indexes array back to default!
      //default -- has item and index of current iteration passed by caller!
      potentialTargetIndexes = [];
      total = currentIteration.item;
      potentialTargetIndexes.push(currentIteration.index);
    } else if (item < target) {
      //possible index that could be used to match the number provided!
      potentialTargetIndexes.push(index);
      total = item + total;
    }
  }
  return matchedTargetIndexes;
};

var doesInputMatchTarget = function (item, total, target) {
  return (
    itemExactlyMatchesTarget(item, target) ||
    total === target ||
    item + total === target
  );
};
/***
 * @param {number} item
 * @param {number} target
 * @return {boolean} checks whether items is equals to target
 */
var itemExactlyMatchesTarget = function (item, target) {
  return item === target;
};
twoSum([3, 2, 4], 6);
