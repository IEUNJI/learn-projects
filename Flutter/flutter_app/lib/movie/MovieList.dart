import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';

class MovieList extends StatefulWidget {
  @override
  _MovieListState createState() => _MovieListState();
}

class _MovieListState extends State<MovieList> {
  List movieList = [];

  @override
  void initState() {
    super.initState();
    getMovieList();
  }

  getMovieList() async {
    var url =
        'https://movie.douban.com/j/search_subjects?type=tv&tag=%E9%9F%A9%E5%89%A7&page_limit=50&page_start=0';
    var httpClient = HttpClient();

    try {
      var request = await httpClient.getUrl(Uri.parse(url));
      var response = await request.close();

      if (response.statusCode == HttpStatus.ok) {
        var json = await response.transform(utf8.decoder).join();
        var data = jsonDecode(json);

        setState(() {
          movieList = data['subjects'];
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
      itemCount: movieList.length,
      itemBuilder: (BuildContext context, int index) {
        Map item = movieList[index];
        return Container(
          padding: EdgeInsets.all(10),
          child: Row(
            children: <Widget>[
              Container(
                width: 127.5,
                height: 178.5,
                child: Image(
                  fit: BoxFit.cover,
                  image: NetworkImage('${item['cover']}'),
                ),
              ),
              Expanded(
                child: Container(
                  height: 160,
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
                      Text('评分：${item['rate']}'),
                      Text('新上映：${item['is_new'] ? '是' : '否'}'),
                      Text('可播放：${item['playable'] ? '是' : '否'}'),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
