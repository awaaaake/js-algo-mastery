const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim();
/**
 * 1.괄호
 * 2.곱하기 나누기
 * 3.더하기 빼기
 */
let result = "";
let stack = [];

for (let char of input) {
  if ("A" <= char && char <= "Z") {
    result += char;
  } else if (char === "(") {
    stack.push(char);
  } else if (char === ")") {
    while (stack.length > 0 && stack[stack.length - 1] !== "(") {
      result += stack.pop();
    }
    stack.pop(); //(지우기
  } else if (char === "+" || char === "-") {
    while (stack.length > 0 && stack[stack.length-1]!=="(") {
      result += stack.pop();
    }
    stack.push(char);
  } else if (char === "*" || char === "/") {
    while (
      stack.length > 0 &&
      (stack[stack.length - 1] === "/" || stack[stack.length - 1] === "*")
    ) {
      result += stack.pop();
    }
    stack.push(char);
  }
}

while (stack.length > 0) {
  result += stack.pop();
}
console.log(result);
