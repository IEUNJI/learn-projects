const arr1 = [1, 2, 3, 1, 2, 3];
const arr2 = [4, 5, 6, 1, 2, 3];

// 并集
const union = [...new Set([...arr1, ...arr2])];
console.log(union); // [1, 2, 3, 4, 5, 6]

// 交集
const set1 = new Set(arr1);
const set2 = new Set(arr2);
const intersection = [...set1].filter(item => {
  return set2.has(item);
});
console.log(intersection); // [1, 2, 3]
