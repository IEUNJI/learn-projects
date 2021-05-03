import 'package:flutter/material.dart';

import '../data/CustomData.dart';

class MovieScroll extends StatelessWidget {
  final List scrollList = CustomData().scrollList;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 240,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: scrollList.length,
        itemBuilder: (BuildContext context, int index) {
          return ScrollItem(item: scrollList[index]);
        },
      ),
    );
  }
}

class ScrollItem extends StatelessWidget {
  final Map item;

  ScrollItem({@required this.item}) : super();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 127.5,
      padding: EdgeInsets.only(left: 5, right: 5),
      child: Column(
        children: <Widget>[
          Container(
            child: Image(
              width: 127.5,
              height: 178.5,
              fit: BoxFit.cover,
              image: NetworkImage(
                item['cover'],
              ),
            ),
          ),
          Text(
            '${item['title']}',
          ),
          Text(
            '${item['rate']}',
            style: TextStyle(
              color: Colors.grey,
            ),
          ),
        ],
      ),
    );
  }
}
