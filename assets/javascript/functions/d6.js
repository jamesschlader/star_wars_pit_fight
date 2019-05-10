export default function d6(factor) {
  let sum = 0;
  for (let j = 1; j < factor + 1; j++) {
    sum += Math.floor(Math.random() * 5 + 1);
  }
  return sum;
}
