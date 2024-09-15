class Comp
  def initialize(a, b)
    # 複素数 a+bi
    @a = a; @b = b
  end

  def getReal
    @a
  end

  def getImagine
    @b
  end

  def to_s
    str = ""
    if @a != 0 then str += "#{@a}" end
    if @a != 0 && @b > 0 then str += "+" end
    if @b != 0 then str += "#{@b}i" end
    str
  end

  def abs
    return Math.sqrt(@a ** 2 + @b ** 2)
  end

  def conj
    # 共役複素数を返す
    Comp.new(@a, -1 * @b)
  end

  def +(x)
    c = x.getReal
    d = x.getImagine
    Comp.new(@a + c, @b + d)
  end

  def -(x)
    c = x.getReal
    d = x.getImagine
    Comp.new(@a - c, @b - d)
  end

  def *(x)
    c = x.getReal
    d = x.getImagine
    Comp.new(@a * c - @b * d, @a * d + @b * c)
  end

  def **(n)
    (n - 1).times {
      res = self * self
      @a = res.getReal
      @b = res.getImagine
    }
    self
  end

  def /(x)
    if x.getImagine != 0
      # 分母に虚数があるなら実数化する
      top = self * x.conj
      x = x * x.conj
      @a = top.getReal
      @b = top.getImagine
    end
    c = x.getReal
    Comp.new(@a / c.to_f, @b / c.to_f)
  end
end

class Float
  def to_comp
    Comp.new(self, 0)
  end
end

class Integer
  def to_comp
    Comp.new(self, 0)
  end
end

a = Comp.new(0, 1) # i
b = Comp.new(1, 1) # 1+i
puts a + b => 1 + 2i
puts a - b => -1
puts a * b => -1 + 1i
puts a / b => 0.5 + 0.5i
