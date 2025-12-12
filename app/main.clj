(ns main
  (:require [clojure.string :as str]))

(defn parse-instruction [line]
  {:direction (first line)
   :amount (Integer/parseInt (subs line 1))})

(defn process-step [[dial password] direction]
  (let [new-dial (if (= direction \L) (dec dial) (inc dial))
        new-password (if (zero? (mod new-dial 100)) (inc password) password)]
    [new-dial new-password]))

(defn process-instruction [state {:keys [direction amount]}]
  (reduce (fn [s _] (process-step s direction))
          state
          (range amount)))

(defn solve [instructions]
  (let [[_ password] (reduce process-instruction [50 0] instructions)]
    password))

(defn -main []
  (let [contents (slurp "day1-pt-2/input_long.txt")
        lines (str/split-lines contents)
        instructions (map parse-instruction lines)
        password (solve instructions)]
    (println "\n\n***** password *****")
    (println password)
    (println "\n")))

(-main)
