def judge(arrA, arrB)
  n = arrA.size
  win = 0
  lose = 0
  n.times do |i|
    if (arrA[i] + 1) % 3 == arrB[i]
      win += 1
    elsif (arrA[i] - 1) % 3 == arrB[i]
      lose += 1
    end
  end
  if win == lose
    return "DRAW"
  elsif win > lose
    return "A"
  else
    return "B"
  end
end

20.times do |i|
  a = []
  b = []
  rand(1..20).times do |j|
    a << rand(0..2)
    b << rand(0..2)
  end
  puts "[#{a.join(",")}], [#{b.join(",")}] => #{judge(a, b)}"
end
