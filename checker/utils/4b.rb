def sort(input)
  n = input.size
  data = input.dup
  while true
    swapped = false
    for i in 0..n - 2
      if data[i] > data[i + 1]
        data[i], data[i + 1] = data[i + 1], data[i]
        swapped = true
      end
    end
    break unless swapped
  end
  return data
end

# Random Case
50.times do |i|
  a = rand()
  b = rand()
  c = rand()
  x = rand()
  y = rand()
  r = rand()
  printf("%s => %s\n", input, sort(input))
end
