-- module Day1 where
module Day1 (part1, part2) where

import Debug.Trace

data Command = Command {
  direction :: String,
  count :: Int
} deriving (Show)

parseCommand :: String -> Command
parseCommand (first:rest) =
  Command {
    direction = [first],
    count = read rest :: Int
  }
parseCommand _ = error "Invalid command format"


turnLeft :: Int -> Int -> Int
turnLeft curr num = 
  let total = (curr - num)
      modSum = total `mod` 100
      positiveSum = if modSum < 0 then (100 + modSum) else modSum
  in positiveSum


turnRight :: Int -> Int -> Int 
turnRight curr num = 
  let total = (curr + num)
      modSum = total `mod` 100
  in modSum


calculateEndNumber :: Int -> Command -> Int
calculateEndNumber currNum command = 
  let commandCount = count command 
      commandDir = direction command
      endingNum = if commandDir == "L" then (turnLeft currNum commandCount) else (turnRight currNum commandCount)
  in endingNum


-- Takes a list of commands and a current number, and returns the amount of
-- times you land on 0 after a command
doCommands :: [Command] -> Int -> Int
doCommands (command:rest) currNum =
  let end = (calculateEndNumber currNum command)
      isZero = end == 0
      restZeroes = (doCommands rest end)
      result = if isZero then 1 + restZeroes else restZeroes
  in result
doCommands _ _ = 0


part1 :: [String] -> Int
part1 inputLines =
  let commands = (map parseCommand inputLines)
      numZeroes = (doCommands commands 50)
  in numZeroes

-------------------------------------------------------------------------------------------------

data ZeroesResult = ZeroesResult {
  endNum :: Int,
  numZeroesPassed :: Int
} deriving (Show)

turnLeftPt2 :: Int -> Int -> ZeroesResult
turnLeftPt2 curr num = 
  let total = (curr - num)
      modSum = (mod (trace ("total: "++(show total)) total) 100)
      zeroesPassed = if total < 0 then (ceiling ((abs (fromIntegral total)) / 100)) else 0
      positiveSum = if modSum < 0 then (100 + modSum) else modSum
  in (traceShowId ZeroesResult {
    endNum = positiveSum,
    numZeroesPassed = zeroesPassed
  })


turnRightPt2 :: Int -> Int -> ZeroesResult
turnRightPt2 curr num = 
  let total = (curr + num)
      modSum = total `mod` 100
      fZeroesPassed = (((fromIntegral total) / 100) :: Float)
      numZeroesPassed = (floor fZeroesPassed)
  in (traceShowId ZeroesResult {
    endNum = modSum,
    numZeroesPassed = numZeroesPassed
  })

-- Calculate the end number, and the amount of times the dial passed zero
calculateZeroesPt2 :: Int -> [Command] -> Int
calculateZeroesPt2 currNum (first:rest) = 
  let numToMove = (count first)
      dirToMove = (direction first)
      zeroesResult = if dirToMove == "L" then (turnLeftPt2 currNum numToMove) else (turnRightPt2 currNum numToMove)
      endingNumber = (endNum zeroesResult)
      isZero = (trace ("endingNumber: "++(show endingNumber)) endingNumber) == 0
      zeroesPassed = (numZeroesPassed zeroesResult)
      totalZeroes = (trace ("zeroesPassed: "++(show zeroesPassed)) zeroesPassed) + (calculateZeroesPt2 endingNumber rest)
  in totalZeroes
calculateZeroesPt2 _ [] = 0


part2 :: [String] -> Int
part2 inputLines = 
  -- let commands = [Command { direction = "L", count = 300}]
  let commands = (map parseCommand inputLines)
      result = calculateZeroesPt2 50 commands
  in (trace ("Part 2 is: "++(show result)) result)