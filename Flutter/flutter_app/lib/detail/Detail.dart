import 'package:flutter/material.dart';

class Detail extends StatelessWidget {
  Detail({@required this.item}) : super();

  final Map item;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${item['title']}'),
      ),
      body: Column(
        children: <Widget>[
          // Image(
          //   image: NetworkImage(
          //     '${item['user_cover']}',
          //   ),
          // ),
          Image(
            image: NetworkImage(
              '${item['system_cover']}',
            ),
          ),
          Row(
            children: <Widget>[
              Container(
                width: 100,
                child: Text('房间标题：'),
              ),
              Expanded(
                child: Text('${item['title']}'),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              Container(
                width: 100,
                child: Text('房间号：'),
              ),
              Expanded(
                child: Text('${item['roomid']}'),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              Container(
                width: 100,
                child: Text('UP主：'),
              ),
              Expanded(
                child: Text('${item['uname']}'),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              Container(
                width: 100,
                child: Text('UID：'),
              ),
              Expanded(
                child: Text('${item['uid']}'),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              Container(
                width: 100,
                child: Text('热度：'),
              ),
              Expanded(
                child: Text('${item['online']}'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
