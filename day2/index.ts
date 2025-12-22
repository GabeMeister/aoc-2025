// const input = await Bun.file("input_shortest.txt").text();
// const input = await Bun.file("input_short.txt").text();
const input = await Bun.file("input_long.txt").text();
const line = input.trim().split("\n")[0];
if (!line) {
  process.exit(0);
}
const ranges = line?.split(",");

const getRange = (line: string): [number, number] => {
  const range = line.split("-").map((x) => parseInt(x) ?? 0);
  return [range?.[0] ?? 0, range?.[1] ?? 0];
};

// Find invalid IDs by looking for any ID which is made only of some sequence of
// digits repeated twice. So, 55 (5 twice), 6464 (64 twice), and 123123 (123
// twice) would all be invalid IDs.
const isInvalid = (num: number): boolean => {
  if (num < 10 && num > -10) {
    // Single digits can never be invalid, cause a digit has to be repeated twice
    return false;
  }

  const numStr = num.toString();

  const recognizedLength = [2, 4, 6, 8, 10].includes(numStr.length);
  if (!recognizedLength) {
    return false;
  }
  const halfLength = numStr.length / 2;
  const isInvalidNum =
    numStr.slice(0, halfLength) === numStr.slice(halfLength, numStr.length);

  return isInvalidNum;
};

const expandRange = (range: [number, number]): number[] => {
  const nums = [];
  for (let i = range[0]; i <= range[1]; i++) {
    nums.push(i);
  }

  return nums;
};

const part1 = () => {
  const overallTotal = ranges.reduce((total, rangeStr) => {
    const range = getRange(rangeStr);
    const expandedRange = expandRange(range);

    const rangeTotal = expandedRange.reduce((acc, curr) => {
      if (isInvalid(curr)) {
        return acc + curr;
      } else {
        return acc;
      }
    }, 0);

    return total + rangeTotal;
  }, 0);
  console.log("Part 1:", overallTotal);
};

const sameDigitRepeat = (numStr: string): boolean => {
  const first = numStr[0] ?? "";
  const result = Array.from(numStr).reduce((acc, digit) => {
    return acc && digit === first;
  }, true);

  return result;
};

const isInvalidPt2 = (num: number): boolean => {
  if (num < 10 && num > -10) {
    // Single digits can never be invalid, cause a digit has to be repeated twice
    return false;
  }

  const numStr = num.toString();

  // 2 can only have 1 repeated
  // 4 can only have 2 or 1 repeated
  // 6 can only have 3 or 2 or 1 repeated
  // 8 can only have 4 or 2 or 1 repeated
  // 10 can only have 5 or 2 or 1 repeated

  switch (numStr.length) {
    case 2: {
      return numStr[0] === numStr[1];
    }
    case 3: {
      return sameDigitRepeat(numStr);
    }
    case 4: {
      const twoRepeat = isInvalid(num);
      return twoRepeat || sameDigitRepeat(numStr);
    }
    case 5: {
      return sameDigitRepeat(numStr);
    }
    case 6: {
      const threeRepeat = isInvalid(num);
      const twoRepeat =
        numStr.slice(0, 2) === numStr.slice(2, 4) &&
        numStr.slice(0, 2) === numStr.slice(4, 6);
      return threeRepeat || twoRepeat || sameDigitRepeat(numStr);
    }
    case 7: {
      return sameDigitRepeat(numStr);
    }
    case 8: {
      const fourRepeat = isInvalid(num);
      const twoRepeat =
        numStr.slice(0, 2) === numStr.slice(2, 4) &&
        numStr.slice(0, 2) === numStr.slice(4, 6) &&
        numStr.slice(0, 2) === numStr.slice(6, 8);
      return fourRepeat || twoRepeat || sameDigitRepeat(numStr);
    }
    case 9: {
      const threeRepeat =
        numStr.slice(0, 3) === numStr.slice(3, 6) &&
        numStr.slice(0, 3) === numStr.slice(6, 9);
      return threeRepeat || sameDigitRepeat(numStr);
    }
    case 10: {
      const fiveRepeat = isInvalid(num);
      const twoRepeat =
        numStr.slice(0, 2) === numStr.slice(2, 4) &&
        numStr.slice(0, 2) === numStr.slice(4, 6) &&
        numStr.slice(0, 2) === numStr.slice(6, 8) &&
        numStr.slice(0, 2) === numStr.slice(8, 10);
      return fiveRepeat || twoRepeat || sameDigitRepeat(numStr);
    }
    default: {
      throw new Error(`Unrecognized length for ${numStr}: ${numStr.length}`);
    }
  }
};

const part2 = () => {
  const overallTotal = ranges.reduce((total, rangeStr) => {
    const range = getRange(rangeStr);
    const expandedRange = expandRange(range);

    const rangeTotal = expandedRange.reduce((acc, curr) => {
      if (isInvalidPt2(curr)) {
        return acc + curr;
      } else {
        return acc;
      }
    }, 0);

    return total + rangeTotal;
  }, 0);
  console.log("Part 2:", overallTotal);
};

part1();
part2();
