## Linux 环境变量

最近阅读了一些`linux`相关的书籍、文章以及文档，想结合自己的理解来讲解一下`linux`的环境变量。

本文的参考内容如下，感兴趣的小伙伴也可以阅读原文：

- [linux man page online](https://man7.org/linux/man-pages/index.html): 查询 linux 命令
- book: [The Linux Command Line](https://linuxcommand.org/tlcl.php)(11 - The Environment)
- [Variables](https://linux.die.net/Bash-Beginners-Guide/sect_03_02.html)

我的日常开发环境如下：

- 操作系统:macos
- `shell`: zsh

### 变量

`linux`中的变量有如下俩类：

- `shell`变量(局部变量)： 只能在当前`shell`中使用
- 环境变量(全局变量): 可以传递变量到子`shell`

可以通过以下俩种方式来查看定义的变量：

- printenv : 没有参数时列出所有的环境变量，有参数时列出参数对应的环境变量
- echo: 显示对应的`shell`变量或环境变量

#### `shell`变量

在终端中可以直接通过`name=value`的形式来创建变量：

```shell
# 等号左右俩边不能有空格
name=value
```

可以通过`echo $<variable name>`来查看刚才定义的变量:

```shell
echo $name
# value
```

`printenv <variable name>`可以查看定义的环境变量：

```shell
# 由于name不是环境变量，输出内容为空
printenv name
```

通过这种方式定义的变量只能在当前进程中使用，而无法在子进程中使用。

为了验证上述文字，使用`bash`命令在终端中再创建一个子进程，可以看到，此时再次执行`echo $name`不会输出任何内容：

```text
➜  ~ bash

bash-3.2$ echo $name

bash-3.2$
```

#### 环境变量

想要让变量能在子进程中也使用，需要通过`export`来定义变量：

```shell
export name1=value1
```

查看定义的环境变量：

```text
➜  ~ printenv name1
value1
➜  ~ echo $name1
value1
```

此时，我们在子进程中也能访问到定义的变量：

```text
bash

bash-3.2$ printenv name1
value1
bash-3.2$ echo $name1
value1
```

但是当重新开启一个终端后，`shell`
变量和环境变量都会失效无法访问。为了能让变量永久的在所有终端中生效，需要[修改配置文件](https://github.com/wangkaiwd/vite-demo/blob/main/articles/linux-environment.md#%E4%BF%AE%E6%94%B9%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
，这个会在之后进行详细介绍。

#### 内置环境变量

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
PATH=/Users/username/Library/pnpm:/Users/username/.bun/bin:/Users/username/.nvm/versions/node/v16.14.2/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/Users/username/bin:/usr/local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/username/.yarn/bin
```

需要注意的是`PATH`变量，`PATH`中定义了由`:`分割的目录列表，当用户在终端执行一个命令如`ls`时，会在`PATH`
中定义的目录下进行查找，找到对应的文件然后执行。

作为前端开发者，以我们经常用到的`npm`为例：

![](https://cdn.jsdelivr.net/gh/wangkaiwd/drawing-bed/202210161853592.png)

可以看到`npm`所在目录存在于`PATH`对应的目录列表中，所以我们才可以通过终端来执行`npm`命令。其它的终端中的可执行命令，也是如此。

#### `Node.js`中的环境变量(wait approve)

在`Node.js`中可以通过`process.env`来访问以及修改环境变量：

```ts
// 访问环境变量
console.log('mock', process.env.MOCK)

// 设置环境变量
process.env.MOCK = '22222'
```

需要注意的是，`Node.js`在创建子进程的时候环境变量默认和父进程相同：

```ts
import { spawn } from 'node:child_process'

console.log('mock', process.env.MOCK)

process.env.MOCK = '22222'

const childProcess = spawn('sh', ['-c', 'echo $MOCK'], { stdio: 'inherit' })
childProcess.on('error', (err) => {
  console.error(err)
})
```

执行上述代码`MOCK=true npx tsx index.ts`，输出如下：

```text
mock true
22222
```

### Shell 初始化文件

当我们每次打开终端后，`shell`便会从初始化文件中读取一系列配置，如环境变量、别名等。常见的`shell`初始化文件如下：

| 文件         | 内容                                     |
| ------------ | ---------------------------------------- |
| /etc/profile | 应用到所有用户的全局配置                 |
| /etc/bashrc  | 应用到所有用户的全局配置（专用于`bash`） |
| ~/.zshrc     | 用户个人的`zsh`配置                      |

通过`cat ~/.zshrc`命令，可以查看配置文件中的内容。下面展示的是我电脑中配置文件里的一些代码：

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

需要注意的是，这样添加的内容只会在下次重新启动终端，再次读取配置文件时才会生效。为了让配置立即生效，要记得执行如下命令：

```shell
source ~/.zshrc
# 或者 . ~/.zshrc, 俩者作用完全相同
```

执行`printenv A`来查看是否成功添加环境变量：

![](https://cdn.jsdelivr.net/gh/wangkaiwd/drawing-bed/202210161825867.png)

### `npm`执行`scripts`中的`cli`命令

以`vite`为例，在启动项目时需要在`package.json`的`scripts`中配置`{dev: "vite"}`命令，然后在终端执行`npm run dev`，`npm`
便会执行`scripts`中`dev`对应的`vite`命令。

而`vite`命令在执行时，`Node.js`会将其环境变量`PATH`设置为`node_modules/.bin`，即会在`node_modules/.bin`
中查找可以执行的`vite`文件。其实现代码如下：

```ts
// npm-run-dev.ts
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// 核心：通过spawn执行 sh -c -- vite 命令，并将根目录下的./node_modules/.bin添加到环境变量中
// PATH和cwd要根据自已的目录结构来决定
const PATH = `${path.resolve(__dirname, '../../../', './node_modules/.bin')}:${
  process.env.PATH
}`
const ls = spawn('sh', ['-c', '--', 'vite'], {
  env: { PATH },
  cwd: path.resolve(__dirname, '../../../playground/vue-jsx'),
  stdio: 'inherit'
})

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})
ls.on('error', (err) => {
  console.log('err', err)
})
```

上述代码其实就是通过`spawn`命令中的`env`来指定命令执行时的环境变量，从而能够直接运行本地安装的`cli`
。最终`node_modules/.bin/vite`在执行时，执行真正的`vite`源代码。

使用[`tsx`](https://github.com/esbuild-kit/tsx)执行上述代码，便可以实现与`npm run dev`一样的效果。

### 介于

以下是文中涉及到的`linux`命令：

- [printenv](https://man7.org/linux/man-pages/man1/printenv.1.html)
- [export](https://www.man7.org/linux/man-pages/man1/export.1p.html)
- [source(.)](https://man7.org/linux/man-pages/man1/dot.1p.html)

学习`linux`的相关知识，帮助我进一步深入理解了`Node.js`中`cli`的运行和调试过程，也让自己能更熟练的使用前端以及开发`cli`工具。

以上就是我对`linux`环境变量的一些理解，希望这些知识也能对你有所帮助。
