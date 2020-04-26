## React-ssr

##### 从0到1搭建ssr

1、环境搭建

```javascript
mkdir react-ssr
// 创建package.json
npm init -y
```

**创建webpack.server.js，node打包用**

```javascript
const path = require('path')

module.exports = {
  target: 'node', // server特有
	mode: 'development',
  entry: './server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  }
}
```

**client/index.js**，和server/index.js基本一致：

```javascript
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        preset: ['@babel/preset-react', '@babel/preset-env']
      }
    ]
  }
}
```

创建如下目录：

![image-20200303162124555](/Users/su/Library/Application Support/typora-user-images/image-20200303162124555.png)	

2、安装依赖

因为要用到webpack打包，所以安装：webpack	webpack-cli -D

babel: babel-loader	@babel/core	@babel/preset-react	@babel/preset-env

> 总结：要安装的包有：
>
> webpack	webpack-cli	webpack-node-externals
>
> babel-loader	@babel/core	@babel/preset-react	@babel/preset-env  
>
> style-loader  	css-loader
>
> react	react-dom
>
> express
>
> 

安装上述依赖。

3、配置项目命令

```javascript
...
"scripts": {
	"dev:server": "webpack --config webpack.server.js --watch",
  "dev:client": "webpack --config webpack.client.js --watch"
}
...
```

server.js

```javascript
import { renderToString } from 'react-dom/server'
// 使用renderToString来渲染
```

















