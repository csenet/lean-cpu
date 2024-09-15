# 1c TestCase Generator

PI = 3.141592653589793

def solve(a, b, c)
  x1 = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a)
  x2 = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a)
  return [x1.round(2), x2.round(2)]
end

# # Manual Case
# print("0,0 => 0")
# print("100,100 => 200")
# print("-100,-100 => -200")
# print("-100,100 => 0")

50.times do |i|
  a = rand(1..100)
  b = rand(1..100)
  c = rand(1..100)
  if b ** 2 - 4 * a * c >= 0.0
    printf("%d, %d, %d => %s\n", a, b, c, solve(a, b, c))
  end
end

10000.times do |i|
  a = rand(1..100)
  b = rand(1..100)
  c = rand(1..100)
  if b ** 2 - 4 * a * c == 0.0
    printf("%d, %d, %d => %s\n", a, b, c, solve(a, b, c))
  end
end
