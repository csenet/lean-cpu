def f(n, dp)
  return dp[n] if dp[n] != nil
  return 1 if n == 0 || n == 1
  return dp[n] = f(n - 1, dp) + f(n - 2, dp)
end

p f(30, Array.new(30 + 1))
