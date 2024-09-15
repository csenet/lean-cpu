# 1a TestCase Generator

PI = 3.141592653589793

# # Manual Case
# print("0,0 => 0")
# print("100,100 => 200")
# print("-100,-100 => -200")
# print("-100,100 => 0")

def vcorn(r, h)
  Math::PI * r * r * h / 3.0
end

# Random Case
20.times do |i|
  r = rand(0..5)
  h = rand(0..10)
  printf("%d, %d => %.2f\n", r, h, vcorn(r, h))
end
