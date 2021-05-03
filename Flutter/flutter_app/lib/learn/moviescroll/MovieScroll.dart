import 'package:flutter/material.dart';

import 'Detail.dart';

class MovieScroll extends StatelessWidget {
  final List imgList = [
    'https://imgs.aixifan.com/KwyrANgSla-iEziQn-bUf2e2-Q3Ybm2-bAR3Mz.png?imageView2/1/w/508/h/260/q/100',
    'https://imgs.aixifan.com/FBqHBciV4e-3Ere2i-2QR3e2-FnAri2-B3maee.png?imageView2/1/w/508/h/260/q/100',
    'https://imgs.aixifan.com/aM7rbtSsQp-ayqAb2-ARzy6f-NreyMn-YbqUv2.jpg?imageView2/1/w/508/h/260/q/100',
    'https://imgs.aixifan.com/B5syS2Lxe4-Yri2mu-e26vQv-QBBJBj-U7N32q.png?imageView2/1/w/508/h/260/q/100',
    'https://imgs.aixifan.com/2ZIeVuyaSy-ieaUvu-zaEFbu-3aiuEv-2YniMj.png?imageView2/1/w/508/h/260/q/100'
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
            height: 154.375,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemBuilder: (BuildContext context, int index) {
                var _item = imgList[index];
                return _ImgItem(url: _item);
              },
              itemCount: imgList.length,
            )),
      ),
    );
  }
}

class _ImgItem extends StatelessWidget {
  _ImgItem({@required this.url}) : super();

  final String url;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(
          builder: (BuildContext context) {
            return Detail(url: url);
          },
        ));
      },
      child: Container(
        width: 301.25,
        child: Image(
          image: NetworkImage(
            '$url',
          ),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
