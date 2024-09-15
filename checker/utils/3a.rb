def getWay(n, x)
  ans = 0
  for a in 0..n
    for b in 0..n
      for c in 0..n
        if a * 1 + b * 2 + c * 5 == x
          ans += 1
        end
      end
    end
  end
  return ans
end

# Random Case
20.times do |i|
  n = rand(5..30)
  x = rand(50..300)
  printf("%d %d => %s\n", n, x, getWay(n, x))
end
