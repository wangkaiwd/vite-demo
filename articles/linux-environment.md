## Linux 环境变量
> [The Bash environment](https://linux.die.net/Bash-Beginners-Guide/chap_03.html)

最近阅读了一些`linux`相关的书籍和文章以及文档，想结合自己的理解来讲解一下`linux`的环境变量。

本文的参考内容如下，感兴趣的小伙伴也可以阅读原文：
* [linux man page online](https://man7.org/linux/man-pages/index.html): 查询linux命令
* book: [The Linux Command Line](https://linuxcommand.org/tlcl.php)(11 - The Environment)
* [Variables](https://linux.die.net/Bash-Beginners-Guide/sect_03_02.html)

### Shell 初始化文件

### 变量

* 变量类型
* 创建/查看局部变量
* 创建/查看全局变量
* 内置变量：`PATH`
* 更改环境变量
  * 持久化环境变量：`.`,`source`

实战：

* `npm`为什么可以在命令行中直接运行？
* `node.js`中设置/查看环境变量：`process.env`
* `npm`是在执行`scripts`时如何在`node_modules/.bin`中进行查找对应的命令？

### 总结

本文涉及到的所有`linux`命令如下，如有任何疏漏还望指正：

* echo
* printenv
* set
* export
* source/.



