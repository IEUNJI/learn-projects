class Point {
  num x;
  num y;

  Point(num x, num y) {
    this.x = x;
    this.y = y;
  }

  void say() {
    print(this.x + this.y);
  }
}

fn1() {
  var p1 = new Point(1, 2);

  print(p1.x); // 1
  p1.say();
}

main() {
  fn1();
}
