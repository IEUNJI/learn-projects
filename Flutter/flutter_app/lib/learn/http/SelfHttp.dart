import 'package:flutter/material.dart';

import 'dart:io';
import 'dart:convert';

class SelfHttp extends StatefulWidget {
  @override
  _SelfHttpState createState() => _SelfHttpState();
}

class _SelfHttpState extends State<SelfHttp> {
  List _list = [];

  @override
  void initState() {
    super.initState();
    getMovieList();
  }

  void getMovieList() async {
    var url =
        'https://m.maoyan.com/ajax/moreComingList?token=&movieIds=1219866%2C1203109%2C1358352%2C1243792%2C1218159%2C78341%2C342068%2C345810%2C1250729%2C1280654&optimus_uuid=CDB8D840E50211EAA86AC10F7C72D0552C521B43295D4DD4AB3C25D1A243836C&optimus_risk_level=71&optimus_code=10';
    var httpClient = HttpClient();

    try {
      var request = await httpClient.getUrl(Uri.parse(url));
      var response = await request.close();

      if (response.statusCode == HttpStatus.ok) {
        var json = await response.transform(utf8.decoder).join();
        var data = jsonDecode(json);

        setState(() {
          _list = data['coming'];
        });
      } else {
        print('Error getting IP address: Http status ${response.statusCode}');
      }
    } catch (exception) {
      print('Failed getting IP address: $exception');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Scaffold(
        appBar: AppBar(),
        body: ListView.builder(
          itemCount: _list.length,
          itemBuilder: (BuildContext context, int i) {
            var _item = _list[i];

            return Text(
              '${_item['nm']}',
              style: TextStyle(
                fontSize: 30,
              ),
            );
          },
        ),
      ),
    );
  }
}
