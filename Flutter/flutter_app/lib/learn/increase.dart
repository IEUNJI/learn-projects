import 'package:flutter/material.dart';

class Increase extends StatefulWidget {
  @override
  _IncreaseState createState() {
    return _IncreaseState();
  }
}

class _IncreaseState extends State<Increase> {
  int _count = 0;

  void _increaseCount() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('计数器'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('点击了 $_count 次'),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _increaseCount,
        tooltip: '请点击',
        child: Icon(Icons.add),
      ),
    );
  }
}
