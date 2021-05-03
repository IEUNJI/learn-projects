import 'package:flutter/material.dart';

class IconSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        _IconItem(title: 'CALL', icon: Icons.call),
        _IconItem(title: 'ROUTE', icon: Icons.near_me),
        _IconItem(title: 'SHARE', icon: Icons.share),
      ],
    );
  }
}

class _IconItem extends StatelessWidget {
  _IconItem({@required this.icon, @required this.title}) : super();

  final IconData icon;
  final String title;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(
            bottom: 5,
          ),
          child: Icon(
            icon,
            color: Colors.blue,
          ),
        ),
        Text(
          '$title',
          style: TextStyle(
            color: Colors.blue,
          ),
        ),
      ],
    );
  }
}
