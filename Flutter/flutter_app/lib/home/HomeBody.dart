import 'package:flutter/material.dart';

import './MovieScroll.dart';

class HomeBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        HomeBodyArea(title: '最新电影'),
        HomeBodyArea(title: '最新电视剧'),
        HomeBodyArea(title: '最新动漫'),
        HomeBodyArea(title: '最新综艺'),
      ],
    );
  }
}

class HomeBodyArea extends StatelessWidget {
  final String title;

  HomeBodyArea({@required this.title}) : super();

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(left: 5, right: 5),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(
                  '$title',
                  style: TextStyle(
                    fontSize: 18,
                    height: 2,
                  ),
                ),
                Text(
                  '更多>>',
                  style: TextStyle(
                    color: Colors.pinkAccent,
                  ),
                ),
              ],
            ),
          ),
          MovieScroll(),
        ],
      ),
    );
  }
}
