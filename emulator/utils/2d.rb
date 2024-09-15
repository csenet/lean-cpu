def getPrimes(max)
  list = (2..max).to_a
  prime_list = []
  sqrt = Math.sqrt(max).floor

  while val = list.shift
    prime_list << val
    if val > sqrt
      break
    end
    list.delete_if{|num| num % val == 0}
  end
  return prime_list.concat(list)
end

# Random Case
20.times do |i|
  x = Random.rand(1000..10000)
  printf("%d => %s\n", x, getPrimes(x))
end
