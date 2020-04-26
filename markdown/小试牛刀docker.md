## 小试牛刀：docker

本文将介绍docker从安装运行到打包镜像，并push到hub上的一个整体流程。

docker是个什么东西？一句话概述：应用容器。可以将我们的项目、环境等打包成镜像，部署的时候，直接运行这个包，就可以了。

##### 一、安装docker

进入[官网](https://www.docker.com/products/docker-desktop)，点击下载即可。下载完成之后，直接安装，win10和mac是有客户端(docker-compose)的，同时安装上就可以了。安装完成之后，启动客户端即可。

在命令后输入docker：

```javascript
$ docker
Usage:	docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/Users/su/.docker")
...
```

表示安装成功。

##### 二、打包镜像

这里用到的项目是前篇文章里的：egg-mongo，点击[这里](https://github.com/SUH11/egg-mongo)可以下载。这个项目用到了mongodb，所以要先从官方pull mongodb的镜像：

```javascript
$ docker search mongo // 查询docker官网library的mongo信息
$ docker pull mongo // 默认拉取最新镜像
```

因为docker是国外的，所以要等很久，可以更改docker的镜像地址，这里就不赘述了。

拉取成功之后，输出镜像的信息：

```
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mongo               latest              1bc58f3232ec        6 days ago          413MB
```

可以看到mongo这个镜像已经成功pull了。



##### 其他

