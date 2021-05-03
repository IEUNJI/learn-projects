import 'package:flutter/material.dart';

class Detail extends StatelessWidget {
  Detail({@required this.url}) : super();

  final String url;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('番剧详情'),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            Image(
              image: NetworkImage(
                '$url',
              ),
            ),
            GestureDetector(
              onTap: () {
                Navigator.of(context).pop();
              },
              child: Text(
                '49万播放量',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
