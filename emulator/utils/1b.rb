# 1b TestCase Generator

PI = 3.141592653589793

def div(m, n)
  sol = m / n
  rem = m % n
  return [sol, rem]
end

# Random Case
10.times do |i|
  m = rand(0..100)
  n = rand(1..10)
  print("#{m}, #{n} => #{div(m, n)}\n")
end
