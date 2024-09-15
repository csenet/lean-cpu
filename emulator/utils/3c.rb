def comb(n, r)
  if r == 0 || r == n then return 1 else return comb(n - 1, r) + comb(n - 1, r - 1) end
end

# Random Case
20.times do |i|
  n = rand(1..30)
  x = rand(1..n)
  printf("%d %d => %s\n", n, x, comb(n, x))
end
