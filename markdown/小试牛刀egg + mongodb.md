### 小试牛刀：egg.js + mongodb

​		本文所用到的技术栈包括node框架egg.js，mongodb数据库，部署会用到docker，不会涉及到基础知识的讲解。希望你对mongodb的CURD操作、Node.js的基础语法有所了解，如有，即可开始本文的阅读。

##### 一、环境搭建

1. 安装node 10.16.0版本（至少不能低于10.x）
2. 安装mongodb数据库
3. 安装docker/docker-compose（可先不安装，后面部署的时候会用到）

##### 二、初始化项目

这一步可以参考[官方文档](https://eggjs.org/zh-cn/)。具体的命令如下：

```js
// 创建项目目录
$ mkdir egg-mongo 
$ cd egg-mongo
// 初始化
$ npm init egg --type=simple
// 安装依赖
$ npm install
```

项目的框架就搭建好了，接下来就启动一下这个项目

```javascript
$ npm run dev
// 在浏览器输入：localhost:7001 
// 如果访问不了，host绑定一下：127.0.0.1 localhost，请确保你的host是正确的
```

在页面中看到**hi, egg**，那么egg的项目就基本搭建好了。

##### 三、目录结构

这是初始化的目录结构：

![image-20190816114434897](/Users/su/Library/Application Support/typora-user-images/image-20190816114434897.png)

先来了解一下这些文件：

1. app目录是最核心的，里面包括了controller，主要存放处理业务逻辑相关代码，router.js是配置浏览器路由地址的地方。

2. config目录是配置相关的，现在只有config.default.js和pluin.js文件。

   config.default.js是用来存放默认配置的文件。

   pluin.js是引入插件的地方，在这里exports之后，app目录就可以访问了。

3. test目录存放测试代码。

##### 四、新增接口

下面我们以一个**localhost:7001/users**获取用户列表为例：

第一步，**在controller目录里，增加user.js文件**，创建一个class类UserController并继承egg的controller。

```javascript
// controller -> user.js
const Controller = require('egg').Controller

class UserController extends Controller {
    /**
     * 获取用户列表
     */
    getUserList() {
        const { ctx } = this;
        // 假装这是从数据库读取的数据
        const mockUsers = [
            { name: 'user1', age: 18, sex: 'girl', job: 'student' },
            { name: 'user2', age: 19, sex: 'girl', job: 'student' },
            { name: 'user3', age: 20, sex: 'boy', job: 'no job' },
        ]

        ctx.body = {
            code: 0,
            message: 'success',
            data: mockUsers
        }
    }
}

module.exports = UserController;
```

为啥要继承Controller呢？因为我们要用到egg封装好的ctx。

ctx又是什么？可以理解为egg将Node里htpp的request、response封装到controller的ctx里了，就不用每次都这么写：

```javascript
const http = require('http')
...
// 发送 HTTP 头部 
// HTTP 状态值: 200 : OK
// 内容类型: text/plain
response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
response.end('Hello World\n');
....
```

具体可以看一下框架的API和源码，这里就不详细赘述了。

第二步**路由表的映射**，在router.js中，增加路由，并将刚才写好的方法放上去。

```javascript
// app -> router.js
module.exports = app => {
  ...
  router.get('/', controller.home.index)
  router.get('/users', controller.user.getUserList) // @add 这是我们新增的内容
}
```

重启一下服务，访问localhost:7001/users，就可以看到mockUsers的数据了。

第三步**编写Service**，一些复杂的业务逻辑一般都会放到service里维护，在实际的应用中应该是Controller调用Service，Service调用db，Service返回结果给Controller，流程大概是这样的：

![image-20190816145435602](/Users/su/Library/Application Support/typora-user-images/image-20190816145435602.png)

在app目录下创建service文件夹，并新建user.js文件。

```javascript
// service -> user.js
const Service = require('egg').Service

class UserSevice extends Service {
    /**
     * 查询所有的user
     */
    find() {
        // 还没有从数据库里查询
        const mockUsers = [
            { name: 'user1', age: 18, sex: 'girl', job: 'student' },
            { name: 'user2', age: 19, sex: 'girl', job: 'student' },
            { name: 'user3', age: 20, sex: 'boy', job: 'no job' },
        ]

        return Object.assign({}, {
            pageNum: 1,
            pageSize: 10,
            list: mockUsers
        })
    }
}

module.exports = UserSevice
```

同时修改Controller里user.js的getUserList方法：

```javascript

...
getUserList() {
		const { ctx } = this;
  	// 假装这是从数据库读取的数据
		const users = service.user.find()

  	ctx.body = {
    		code: 0,
    		message: 'success',
    		data: users
  	}
}
...
```

第三步**连接mongodb**，用的是egg-mongoose这个库，就不用自己写数据库连接了，这也是egg他们家自己搞的库，具体可以点击[这里](https://github.com/eggjs/egg-mongoose)查看。

既然用到这个库，那我们先来安装一下。

```javascript
$ npm install egg-mongoose --save
```

将安装好的插件放到**pluin.js**。

```javascript
// config -> pluin.js
exports.mongoose = {
		enable: true, // 开启插件
		package: 'egg-mongoose'
}
```

在config目录下增加两个文件：**config.local.js** 和 config.prod.js，并写入如下代码：

```javascript
// config -> config.local.js
exports.mongoose = {
    client: {
        url: 'mongodb://127.0.0.1:27017/egg-mongo',
        options: {}
    }
}

exports.baseUrl = 'http://127.0.0.1:7001';

// config.prod.js 目前用不到生产的环境，先不配置
```

不用连接库之前，我们是这样写的：

```javascript
// 该代码来源runoob.com
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/runoob";
 
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});
```

看起来一点都不优雅，对比之下是不是感觉egg-mongoose很清爽😉

好了，下面开始写Schema了。在app目录下创建model文件夹，并创建user.js文件，User的Schema如下：

```javascript
// model -> user.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;
    // 按照mock的数据，有四个字段：name/age/sex/job lastTime是用来标记最后的更改时间
    const UserSchema = new Schema({
        name: {
            type: String
        },
        age: {
            type: Number
        },
        sex: {
            type: String
        },
        job: {
            type: String
        },
        lastTime: {
            type: Number
        }
    })
    // 映射到egg-mongo db 库的users表中（不区分大小写）
    const User = mongoose.model('Users', UserSchema)
    
    // init方法放到这里
		initUserData(User)
  
    return User
}

function initUserData() {}
```

为了看到数据库连接的效果，增加一个initUserData的方法：

```javascript
/**
 * 初始化一个测试用户
 * @param {Object} User 
 */
function initUserData(User) {
  	// 查询数据库
    User.find({}, (err, doc) => {
        if (err) {
            console.log(err)
            console.log('init user failed')
        } else if (!doc.length) {
            new User({
                name: 'UserInitName',
                age: 23,
                sex: 'girl',
                job: '程序媛',
                lastTime: Date.now()
            }).save()
        } else {
            console.log('-------------init user successfully--------------')
        }
    })
}
```

启动本地的mongo，我是用brew装的，新开一个命令行：

```javascript
// 安装
$ brew install mongodb
// 启动
$ cd /usr/local/mongodb/bin
$ sudo mongod
```

看到输出一大推东西，不报错，那mongodb就启动了，回到egg-mongo的命令行：

```javascript
$ npm run dev
```

看到输出**-------------init user successfully--------------**就说明我们的数据库准备好了。

第五步**操作数据库**，修改Service下的user.js find方法，因为可以操作数据库了，所以方法改成async await。

```javascript
// Service -> user.js
/**
 * 查询所有的user
 */
async find() {
    // 从数据库里查询
    const users = await this.ctx.model.User.find({})

    return Object.assign({}, {
        pageNum: 1,
        pageSize: 10,
        list: users
    })
}
```

Controller里的方法也改一下：

```javascript
// Controller -> user.js
/**
 * 获取用户列表
 */
async getUserList() {
    const { ctx, service} = this // 从this获取service
    const users = await service.user.find() 

    ctx.body = {
        code: 0,
        message: 'success',
        data: users
    }
}
```

在浏览器输入：localhost:7001/users，就可以看到我们init里的user了！

```json
{
  code: 0,
  message: "success",
  data: {
    pageNum: 1,
    pageSize: 10,
    list: [
      {
        _id: "5d5663f5129df2088e8c6783",
        name: "UserInitName",
        age: 23,
        sex: "girl",
        job: "程序媛",
        lastTime: 1565942773485,
        __v: 0
      }
    ]
  }
}
```

一个简单的接口就完成了。

##### 五、其他

上面实现的接口是相当简单了，没做login判断，没做鉴权，也没根据pageNum pageSize 搜索条件等来查询，可谓是漏统百出啊。

不过这个例子只是一个入门案例，并不作深入了解。

code地址：https://github.com/SUH11/egg-mongo

egg官网：https://eggjs.org/zh-cn/intro/quickstart.html

