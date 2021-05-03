import 'package:flutter/material.dart';

class SelfImage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Image Page'),
      ),
      body: Container(
        width: 100.0,
        child: Image(
          fit: BoxFit.cover,
          // 网络图片
          // image: NetworkImage(
          //   'http://himg.bdimg.com/sys/portrait/item/a3e66c756d6961e790b40135.jpg'
          // ),
          // 本地图片
          // 在项目根目录下创建 images 文件夹，并在 yaml 文件中配置
          image: AssetImage(
            'images/25121362910.jpg'
          ),
        ),
      ),
    );
  }
}
