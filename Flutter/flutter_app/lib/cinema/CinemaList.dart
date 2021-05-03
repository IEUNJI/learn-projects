import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';

import '../detail/Detail.dart';

class CinemaList extends StatefulWidget {
  @override
  _CinemaListState createState() => _CinemaListState();
}

class _CinemaListState extends State<CinemaList> {
  List cinemaData = [];

  @override
  void initState() {
    super.initState();
    getCinemaData();
  }

  getCinemaData() async {
    var url =
        'https://api.live.bilibili.com/room/v1/room/get_user_recommend?page=1&page_size=30';
    var httpClient = HttpClient();

    try {
      var request = await httpClient.getUrl(Uri.parse(url));
      var response = await request.close();

      if (response.statusCode == HttpStatus.ok) {
        var json = await response.transform(utf8.decoder).join();
        var data = jsonDecode(json);

        setState(() {
          cinemaData = data['data'];
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
    return ListView.builder(
      itemCount: cinemaData.length,
      itemBuilder: (BuildContext context, int index) {
        Map item = cinemaData[index];
        return GestureDetector(
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (BuildContext context) {
                  return Detail(item: item);
                },
              ),
            );
          },
          child: Container(
            padding: EdgeInsets.all(10),
            child: Row(
              children: <Widget>[
                Container(
                  width: 127.5,
                  height: 100,
                  child: Image(
                    fit: BoxFit.contain,
                    image: NetworkImage('${item['system_cover']}'),
                    // image: NetworkImage('${item['user_cover']}'),
                  ),
                ),
                Expanded(
                  child: Container(
                    height: 80,
                    padding: EdgeInsets.only(left: 10),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          '${item['title']}',
                          style: TextStyle(fontSize: 17),
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                        ),
                        Text(
                          '主播：${item['uname']}',
                          style: TextStyle(
                            color: Colors.grey,
                          ),
                        ),
                        Text(
                          '人气：${item['online']}',
                          style: TextStyle(
                            color: Colors.red,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
