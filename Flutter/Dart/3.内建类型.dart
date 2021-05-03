fn1() {
  // Number 有两种类型：int 和 double
  int a = 1;
  double b = 3.14;

  print(a);
  print(b);
}

fn2() {
  // String => int
  var one = int.parse('1');

  // String => double
  var onePointOne = double.parse('1.1');

  print(one); // 1
  print(onePointOne); // 1.1
}

fn3() {
  // int or double => String
  String oneAsString = 1.toString();
  String piAsString = 3.14159.toString();
  String pi2AsString = 3.14159.toStringAsFixed(2);

  print(oneAsString); // '1'
  print(piAsString); // '3.14159'
  print(pi2AsString); // '3.14'
}

fn4() {
  var num = 18;
  var str1 = 'num is $num';
  var str2 = 'num is ${num + 2}';

  print(str1); // 'num is 18'
  print(str2); // 'num is 20'
}

fn5() {
  var str = '';
  var iMeantToDoThis = 0 / 0;

  print(str.isEmpty); // true
  print(iMeantToDoThis.isNaN); // true
}

fn6() {
  var list = [1, 2, 3];
  list[0] = 4;

  print(list.length); // 3
  print(list[0]); // 4
}

fn7() {
  var map = {'a': 0, 'b': 1};
  map['c'] = 2;

  print(map);
  print(map['c']); // 2
  print(map['d']); // null
}

main() {
  fn1();
  fn2();
  fn3();
  fn4();
  fn5();
  fn6();
  fn7();
}
