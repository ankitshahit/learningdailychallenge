var twoSum = function (nums, target) {
  for (var index = 0; index < nums.length; index++) {
    let matchedIndexes = findIndexesMatchTarget({
      nums: nums,
      total: nums[index],
      totalIndex: index,
      target: target,
    });
    if (matchedIndexes.length > 0) {
      console.log(matchedIndexes);
      return matchedIndexes;
    }
  }
};

var findIndexesMatchTarget = function (props) {
  let indexes = [];
  const nums = props.nums;
  const total = props.total;
  const totalIndex = props.totalIndex;
  const target = props.target;

  for (var index = 0; index < nums.length; index++) {
    let item = nums[index];
    if (totalIndex === index) {
      continue;
    }
    if (total + item === target) {
      indexes.push(totalIndex);
      indexes.push(index);
      break;
    }
  }
  return indexes;
};

twoSum([0, 5, 5, 0], 10);
