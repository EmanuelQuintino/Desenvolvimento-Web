// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

for (let count = 0; count <= 10; count++) { /* increment factor */
  if (count > 2 && count < 8) {
    continue;
    // break;
  }

  if (count % 2 == 0) {
    console.log(count);
  }
}

const array = [12, "text", () => "A"];
for (let index = 0; index < array.length; index++) {
  const element = array[index];
  console.log(element);
}

const multArray = [
  [1, 2, 3],
  ["a", "b", "c"],
  [[], {}, () => "X"],
];

console.log(multArray[0][1]);
console.log(multArray[1][2]);
console.log(multArray[2][2]());

for (let i = 0; i < multArray.length; i++) {
  for (let j = 0; j < multArray[i].length; j++) {
    console.log(multArray[i][j]);
  }
}
