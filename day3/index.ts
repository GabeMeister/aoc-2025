// const input = await Bun.file("input_shortest.txt").text();
// const input = await Bun.file("input_short.txt").text();
const input = await Bun.file("input_long.txt").text();
const banks = input.trim().split("\n");
if (!banks) {
  process.exit(0);
}

const getHighestJoltagePt1 = (bank: string): number => {
  // Iterate to find largest first digit
  const firstDigit = Array.from(bank.slice(0, bank.length - 1)).reduce(
    (highest, curr, idx) => {
      const currDigit = parseInt(curr);
      if (currDigit > highest.digit) {
        return { digit: currDigit, idx };
      } else {
        return highest;
      }
    },
    { digit: 0, idx: 0 }
  );

  // Iterage to find largest second digit
  const secondDigit = Array.from(
    bank.slice(firstDigit.idx + 1, bank.length)
  ).reduce(
    (highest, curr, idx) => {
      const currDigit = parseInt(curr);
      if (currDigit > highest.digit) {
        return { digit: currDigit, idx };
      } else {
        return highest;
      }
    },
    { digit: 0, idx: 0 }
  );

  const result = parseInt(`${firstDigit.digit}${secondDigit.digit}`);

  return result;
};

const part1 = () => {
  const total = banks.reduce((acc, bank) => {
    return acc + getHighestJoltagePt1(bank);
  }, 0);

  console.log("Part 1:", total);
};

const getHighestJoltagePt2 = (bank: string) => {
  // There's up to 3 "free spaces" that you can play around with when trying to
  // find the maximum 12 digit number
  let freeSpacesLeft = 3;
  let startingIdx = 0;
  let result = "";
  let length = 0;

  while (length < 12) {
    let tmpHighestIdx = 0;
    let tmpHighest = 0;

    // Find the potential highest digit with the amount of free spaces we have
    // left
    for (let i = startingIdx; i <= startingIdx + freeSpacesLeft; i++) {
      const digit = parseInt(bank[i] ?? "0");
      if (digit > tmpHighest) {
        tmpHighest = digit;
        tmpHighestIdx = i;
      }
    }

    freeSpacesLeft -= tmpHighestIdx - startingIdx;
    startingIdx = tmpHighestIdx + 1;

    result += bank[tmpHighestIdx] ?? "";
    length++;
  }

  return parseInt(result);
};

const part2 = () => {
  const total = banks.reduce((acc, bank) => {
    return acc + getHighestJoltagePt2(bank);
  }, 0);

  console.log("Part 2:", total);
};

part1();
part2();
