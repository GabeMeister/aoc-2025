module Day1 (part1, part2) where

-- import Debug.Trace

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
      modSum = (mod total 100)
  in modSum

calculateEndNumber :: Int -> Command -> Int
calculateEndNumber currNum command = 
  let commandCount = count command 
      commandDir = direction command
      endNum = if commandDir == "L" then (turnLeft currNum commandCount) else (turnRight currNum commandCount)
  in endNum

-- Takes a list of commands and a current number, and returns the amount of
-- times you land on 0 after a command
doCommands :: [Command] -> Int -> Int
doCommands (command:rest) currNum =
  let endNum = (calculateEndNumber currNum command)
      isZero = endNum == 0
      restZeroes = (doCommands rest endNum)
      result = if isZero then 1 + restZeroes else restZeroes
  in result
doCommands _ _ = 0

part1 :: [String] -> Int
part1 inputLines =
  let commands = (map parseCommand inputLines)
      numZeroes = (doCommands commands 50)
  in numZeroes

part2 :: [String] -> Int 
part2 inputLines = length inputLines