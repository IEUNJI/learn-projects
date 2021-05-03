fn1() {
  var name1 = 'Bob'; // 变量的类型被推断为 String
  dynamic name2 = 'Bob'; // 如果对象不限定为单个类型，可以指定为动态类型
  String name3 = 'Bob'; // 显式声明可以推断出的类型

  print(name1);
  print(name2);
  print(name3);
}

fn2() {
  // 未初始化的变量默认值是 null。
  // 即使变量是数字类型默认值也是 null，因为在 Dart 中一切都是对象，数字类型也不例外。
  int lineCount;

  print(lineCount == null); // true
}

fn3() {
  final name1 = 'Bob';
  const name2 = 'Bobby';

  // a final variable, can only be set once.
  // name1 = 'Hello Bob';

  // Constant variables can't be assigned a value.
  // name2 = 'Hello Bobby';

  // final 和 const 的区别：
  // final 为运行时初始化后不可更改的值，子元素不需要是 final 的。
  // const 为编译时初始化后不可更改的值，子元素也需要是 const 的。
}

main() {
  fn1();
  fn2();
  fn3();
}
