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
