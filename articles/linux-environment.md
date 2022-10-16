## Linux 环境变量
> [The Bash environment](https://linux.die.net/Bash-Beginners-Guide/chap_03.html)

最近阅读了一些`linux`相关的书籍和文章以及文档，想结合自己的理解来讲解一下`linux`的环境变量。

本文的参考内容如下，感兴趣的小伙伴也可以阅读原文：
* [linux man page online](https://man7.org/linux/man-pages/index.html): 查询linux命令
* book: [The Linux Command Line](https://linuxcommand.org/tlcl.php)(11 - The Environment)
* [Variables](https://linux.die.net/Bash-Beginners-Guide/sect_03_02.html)

笔者的日常开发环境如下：
* 操作系统:macos
* `shell`: zsh

### 变量

`linux`中的变量有如下俩类：

* `shell`变量(局部变量)： 只能在当前`shell`中使用
* 环境变量(全局变量): 可以传递变量到子`shell`

#### `shell`变量

#### 环境变量

##### 内置环境变量

操作系统中有许多内置的环境变量，执行`printenv`可以查看这些变量：
```shell
# some environment variables
TERM_SESSION_ID=w0t0p0:D35D538F-01B7-407D-AC61-476CD68AE6E7
SSH_AUTH_SOCK=/private/tmp/com.apple.launchd.1Goz8bCjVc/Listeners
LC_TERMINAL_VERSION=3.4.16
COLORFGBG=7;0
ITERM_PROFILE=Default
XPC_FLAGS=0x0
SHELL=/bin/zsh
__CFBundleIdentifier=com.googlecode.iterm2
LC_CTYPE=UTF-8
TERM_PROGRAM_VERSION=3.4.16
TERM_PROGRAM=iTerm.app
LC_TERMINAL=iTerm2
COLORTERM=truecolor
COMMAND_MODE=unix2003
PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

需要注意的是`PATH`变量，`PATH`中定义了由`:`分割的目录列表，当用户在终端执行一个命令如`ls`时，会在`PATH`中定义的目录下进行查找，找到对应的文件然后执行。

作为前端开发者，以我们经常用到的`npm`为例：

![](https://cdn.jsdelivr.net/gh/wangkaiwd/drawing-bed/202210161853592.png)

可以看到`npm`所在目录存在于`PATH`对应的目录列表中，所以我们才可以通过终端来执行`npm`命令。其它的终端中的可执行命令，也是如此

### Shell 初始化文件

当我们每次打开终端后，`shell`便会从初始化文件中读取一系列配置，如环境变量。常见的`shell`初始化文件如下：

| 文件           | 内容                      |
|--------------|-------------------------|
| /etc/profile | 应用到所有用户的全局配置            |
| /etc/bashrc  | 应用到所有用户的全局配置（专用于`bash`） |
| ~/.zshrc     | 用户个人的`zsh`配置            |

通过`cat ~/.zshrc`命令，可以查看配置文件中的内容：
```shell
# If you come from bash you might have to change your $PATH.
export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"

alias cat="pygmentize -g"
```

可以看到，在配置文件中可以进行设置环境变量、设置别名等一系列操作。

### 修改配置文件

当然，配置文件也可以修改来实现一些用户自定义的内容。我们可以通过`vim`命令，在命令行中直接修改配置文件
```shell
vim ~/.zshrc
```

比如，我们在配置文件中增加一个新的环境变量

```shell
# ... some other code
export A=test
```

这样添加的文件只会在下次重新启动终端时再次读取配置文件时才会生效，为了让配置立即生效，要记得执行如下命令：
```shell
source ~/.zshrc
# 或者 . ~/.zshrc, 俩者作用完全相同
```

执行`printenv A`来查看是否成功添加环境变量：

![](https://cdn.jsdelivr.net/gh/wangkaiwd/drawing-bed/202210161825867.png)

### 实战

* `npm`为什么可以在命令行中直接运行？
* `node.js`中设置/查看环境变量：`process.env`
* `npm`是在执行`scripts`时如何在`node_modules/.bin`中进行查找对应的命令？

### 总结

本文涉及到的所有`linux`命令如下，如有任何疏漏还望指正：

* printenv
* set
* export
* [source(.)](https://man7.org/linux/man-pages/man1/dot.1p.html)



