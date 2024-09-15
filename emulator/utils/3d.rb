def getMinCost(h)
  n = h.size
  dp = Array.new(n + 1, 10 ** 9)
  dp[0] = 0
  (n - 1).times do |i|
    dp[i + 1] = [dp[i + 1], dp[i] + (h[i + 1] - h[i]).abs].min
    dp[i + 2] = dp[i] + (h[i + 2] - h[i]).abs if i <= n - 3
  end
  return dp[n - 1]
end

# Random Case
20.times do |i|
  input = Array.new(rand(2..100)) { rand(1...100) }
  printf("%s => %d\n", input, getMinCost(input))
end
