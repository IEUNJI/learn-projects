import 'package:flutter/material.dart';

import 'TitleSection.dart';
import 'IconSection.dart';
import 'TextSection.dart';

class Lakes extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          Image(
            image: AssetImage('images/lakes.jpg'),
          ),
          TitleSection(),
          IconSection(),
          TextSection(),
        ],
      ),
    );
  }
}
