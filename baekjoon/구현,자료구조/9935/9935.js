const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
let [str, explosion] = input.map((el) => el.trim());

const stack = [];
for (let char of str) {
  stack.push(char);
  if (stack.slice(stack.length - explosion.length).join("") === explosion) {
    for (let _ = 0; _ < explosion.length; _++) {
      stack.pop();
    }
  }
}

console.log(stack.length ? stack.join("") : "FRULA");
