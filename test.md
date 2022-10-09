## Notes

* [package exports](https://webpack.js.org/guides/package-exports/)

### Problems

* how to find vite command

flow:
* `vite` command
* [define executable scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts#path)
  * guess this will handle by `require.resolve` method
* [loading from node_modules folder](https://nodejs.org/api/modules.html#loading-from-node_modules-folders)

problems:
* find source code of npm execute scripts flow
  * why we can run npm command 
  * npm how to executable scripts
  * how to find `vite/node_modules/.bin/vite` ?
  * read source code of `vite/node_modules/.bin/vite`

### start vite

What happen when execute `npm run start` ? 

First, Why npm command can execute ?

When we install `node.js`, it will auto put directory pathname which store npm in `PATH` string.

`PATH` is an environment variable , filename in it can execute directly in terminal.

Otherwise, `npm` is a soft link, and its actual location as following:

```shell

```

npm run start -> `npmcli.js` run start

which will execute following code in `npmcli.js`:
```shell
spawn('sh',['-c','--','vite'],{ env: { PATH: '/some/path/node_modules/.bin:/some/node_modules/.bin:...recursive_parent/node_modules/.bin:...other directories' } })
```

Eventually, actually executed command is `sh -c -- /some/path/node_modules/vite`
