import 'package:flutter/material.dart';

class SelfText extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Text Page'),
      ),
      body: Center(
        child: Text(
          'Hello IEUNJI Hello IEUNJI Hello IEUNJI Hello IEUNJI',
          style: TextStyle(
            fontSize: 20.0,
            color: Color.fromARGB(255, 0, 0, 0),
            fontWeight: FontWeight.w700,
          ),
          overflow: TextOverflow.ellipsis,
          maxLines: 1,
        ),
      ),
    );
  }
}
