const input = await Bun.file("input_long.txt").text();
const lines = input.trim().split("\n");

const instructions = lines.map((l) => {
  const direction = l[0];
  const amount = parseInt(l.slice(1));

  return {
    direction,
    amount,
  };
});

let dial = 50;
let password = 0;

instructions.forEach((instr) => {
  for (let i = 0; i < instr.amount; i++) {
    if (instr.direction === "L") {
      dial--;
    } else {
      dial++;
    }

    if (dial % 100 === 0) {
      password++;
    }
  }
});

console.log("\n\n***** password *****\n", password, "\n\n");
