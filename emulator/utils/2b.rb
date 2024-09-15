def isPrime(n)
  if n < 2
    return false
  end
  for i in 2..(n-1)
    if n % i == 0
      return false
    end
  end
  return true
end

# Random Case
500.times do |i|
  x = rand(10000..90000).to_i
  printf("%d => %s\n", x, isPrime(x))
end
