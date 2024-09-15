def minFee(x)
  min = 99999
  fees = [140,190,200,240,320,410,500,580,670,760,840,970,1140,1320,1490,1660]
  for i in 0..x do
    for j in 0..(x-i) do
      a = fees[i/4]
      b = fees[j/4]
      c = fees[(x-i-j)/4]
      a = 0 if i == 0
      b = 0 if j == 0
      min = [a+b+c,min].min
    end
  end
  return min
end

# Random Case
20.times do |i|
  x = Random.rand(90..1000)
  printf("%d => %d\n", x, minFee(60))
end