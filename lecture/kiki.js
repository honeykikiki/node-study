const min = 2;
const max = 10000000;
const primes = [];

function genderate(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i == j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
  }
}
