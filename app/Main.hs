module Main where

-- THIS WORKS!!

data Instruction = Instruction
  { direction :: Char
  , amount :: Int
  } deriving (Show)

parseInstruction :: String -> Instruction
parseInstruction (dir:rest) = Instruction dir (read rest)
parseInstruction _ = error "Invalid instruction"

processStep :: (Int, Int) -> Char -> (Int, Int)
processStep (dial, password) dir =
  let newDial = if dir == 'L' then dial - 1 else dial + 1
      newPassword = if newDial `mod` 100 == 0 then password + 1 else password
  in (newDial, newPassword)

processInstruction :: (Int, Int) -> Instruction -> (Int, Int)
processInstruction state (Instruction dir amt) =
  foldl (\s _ -> processStep s dir) state [1..amt]

solve :: [Instruction] -> Int
solve instructions =
  let (_, password) = foldl processInstruction (50, 0) instructions
  in password

main :: IO ()
main = do
  contents <- readFile "day1-pt-2/input_long.txt"
  let linesOfFile = lines contents
  let instructions = map parseInstruction linesOfFile
  let password = solve instructions
  putStrLn "\n\n***** password *****"
  print password
  putStrLn "\n"
