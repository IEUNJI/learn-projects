import 'package:flutter/material.dart';

import 'HomeBody.dart';
import '../movie/MovieList.dart';
import '../cinema/CinemaList.dart';

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text('哔哩哔哩'),
          centerTitle: true,
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.search),
              onPressed: () {},
            ),
          ],
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.all(0),
            children: <Widget>[
              UserAccountsDrawerHeader(
                accountName: Text('IEUNJI'),
                accountEmail: Text('ieunji@outlook.com'),
                currentAccountPicture: CircleAvatar(
                  backgroundImage: NetworkImage(
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599490331908&di=d2eb891268eceb8b3e62ecb1464b3384&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0',
                  ),
                ),
                decoration: BoxDecoration(
                  image: DecorationImage(
                    fit: BoxFit.cover,
                    image: NetworkImage(
                      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599490495531&di=65e8bec784f52563aa4ffafeca713975&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F23%2F205237dm9mft2ml2dlgl8l.jpg',
                    ),
                  ),
                ),
              ),
              ListTile(
                title: Text('我的发布'),
                trailing: Icon(Icons.send),
              ),
              ListTile(
                title: Text('我的收藏'),
                trailing: Icon(Icons.feedback),
              ),
              ListTile(
                title: Text('系统设置'),
                trailing: Icon(Icons.settings),
              ),
              Divider(
                color: Colors.black26,
              ),
              ListTile(
                title: Text('注销'),
                trailing: Icon(Icons.exit_to_app),
              ),
            ],
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            HomeBody(),
            MovieList(),
            CinemaList(),
          ],
        ),
        bottomNavigationBar: Container(
          height: 54,
          decoration: BoxDecoration(
            color: Colors.pinkAccent,
          ),
          child: TabBar(
            labelStyle: TextStyle(
              height: 0,
              fontSize: 12,
            ),
            tabs: <Widget>[
              Tab(
                text: '首页',
                icon: Icon(Icons.home),
              ),
              Tab(
                text: '热门',
                icon: Icon(Icons.movie_creation),
              ),
              Tab(
                text: '直播',
                icon: Icon(Icons.local_movies),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
