def isTouched(a, b, c, x, y, r)
  d = (a * x + b * y + c).abs / Math.sqrt(a ** 2 + b ** 2)
  return true if (d - r) < 1.0
  return false
end

count = 0
loop do
  a, b, c = rand(100), rand(100), rand(100)
  x, y, r = rand(100), rand(100), rand(100)
  if isTouched(a, b, c, x, y, r)
    printf("%d, %d, %d, %d, %d, %d =>  %s\n", a, b, c, x, y, r, isTouched(a, b, c, x, y, r))
    count += 1
  end
  break if count > 10
end

# Random Case
10.times do |i|
  a, b, c = rand(100), rand(100), rand(100)
  x, y, r = rand(100), rand(100), rand(100)
  printf("%d, %d, %d, %d, %d, %d => %s\n", a, b, c, x, y, r, isTouched(a, b, c, x, y, r))
end
