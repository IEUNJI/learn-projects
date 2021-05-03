// material 组件库
import 'package:flutter/material.dart';

// main 入口函数
void main() {
  // runApp 将组件渲染到屏幕上
  runApp(MyApp());
}

// MyApp 根组件
class MyApp extends StatelessWidget {
  @override
  // build 组件的渲染函数
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'IEUNJI Flutter App', // 多任务界面的标题
      theme: ThemeData(
        primarySwatch: Colors.blue, // 主题色
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(), // 初始路由
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Center(
        child: Text('Hello IEUNJI'),
      ),
    );
  }
}
