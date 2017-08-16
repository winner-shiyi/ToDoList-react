# ToDoList-react

> React、webpack2、gulp、node


## 安装指南

```
npm install

```

## 运行指南

```
gulp watch

```
---

PS：  

1、默认自动开启8088端口，运行前保证该端口不被占用。（也可修改gulpfile.js中配置）

2、项目数据是存储在本地浏览器内，一个小模块localDb用来操作localStorage，原理是：通过将数据格式化成JSON字符串进行存储，使用的时候就解析JSON字符串。（localDb放在vendor的文件夹内）
