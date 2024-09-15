# Random Case
20.times do |i|
  mat = Array.new(n) { Array.new(n) { rand(1...10) } }
  printf("%d %d => %s\n", n, x, comb(n, x))
end

def trans(mat)
  n = mat.size
  result = Array.new(n) { Array.new(n) }
  n.times do |i|
    n.times do |j|
      result[i][j] = mat[j][i]
    end
  end
  return result
end

trans([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
