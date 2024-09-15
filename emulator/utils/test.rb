ans = 0
x = 1200
A = 4
B = 2
C = 2
for a in 0..A
  for b in 0..B
    for c in 0..C
      if a * 500 + b * 100 + c * 50 == x
        ans += 1
        puts "#{a} #{b} #{c}"
      end
    end
  end
end
puts ans
