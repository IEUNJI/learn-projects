fn1() {
  // 命名可选参数 使用 {} 包裹参数
  // 使用 = 赋予默认值
  int sum({int num1 = 0, int num2 = 0, int num3 = 0}) {
    return num1 + num2 + num3;
  }

  print(sum(num1: 1, num2: 2, num3: 3)); // 6
  print(sum(num1: 1, num2: 2)); // 3
}

fn2() {
  // 位置可选参数 使用 [] 包裹
  int sum(int num1, int num2, [int num3 = 0]) {
    return num1 + num2 + num3;
  }

  print(sum(1, 2, 3)); // 6
  print(sum(1, 2)); // 3
}

main() {
  fn1();
  fn2();
}
