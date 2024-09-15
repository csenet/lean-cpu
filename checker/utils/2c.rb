# 2c TestCase Generator

def std(scores)
  sum = 0.0
  n = scores.size
  for score in scores do
    sum += score
  end
  avg = sum / n
  devia = 0.0
  sum_temp = 0.0
  for score in scores
    sum_temp += (score - avg) ** 2
  end
  return Math.sqrt(sum_temp / n).round(2)
end

def getTestCase
  scores = []
  rand(10..30).times do
    scores.push(rand(100))
  end
  return scores
end

1.step(10) do |i|
  testCase = getTestCase
  print("#{testCase} => #{std(testCase)}\n")
end
