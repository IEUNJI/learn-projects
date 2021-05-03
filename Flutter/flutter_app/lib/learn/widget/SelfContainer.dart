import 'package:flutter/material.dart';

class SelfContainer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Container Page'),
      ),
      body: Container(
        // 装饰器
        decoration: BoxDecoration(
          color: Colors.lightBlue,
        ),
        width: 100.0,
        height: 100.0,
        margin: EdgeInsets.all(20.0),
        padding: EdgeInsets.all(10.0),
      ),
    );
  }
}
