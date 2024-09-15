# 2a TestCase Generator

PI = 3.141592653589793


def getFee(x)
  data = [150,190,200,240,330,420,510,590]
  return data[x/4]
end

# Random Case
20.times do |i|
  x = Random.rand(30.0)
  printf("%.1f => %d\n", x, getFee(x))
end
