# 2c TestCase Generator

def cor(scores)
  sum_x = 0.0
  sum_y = 0.0
  n = scores.size
  for score in scores
    sum_x += score[0]
    sum_y += score[1]
  end
  avg_x = sum_x / n
  avg_y = sum_y / n
  temp_x = 0.0
  temp_y = 0.0
  temp_xy = 0.0
  for score in scores
    temp_xy += (score[0] - avg_x) * (score[1] - avg_y)
    temp_x += (score[0] - avg_x) ** 2
    temp_y += (score[1] - avg_y) ** 2
  end
  return temp_xy / (Math.sqrt(temp_x) * Math.sqrt(temp_y))
end

def getTestCase
  scores = []
  rand(5..20).times do
    scores.push([rand(100), rand(100)])
  end
  return scores
end

1.step(10) do |i|
  testCase = getTestCase
  print("#{testCase} => #{cor(testCase).round(2)}\n")
end
