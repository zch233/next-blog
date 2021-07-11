## 前言
webpack5 的新特性，分模块共同开发
- 所需环境: webpack v5 以上，由于我们用的是 vue-cli，所以需要升级 @vue/cli 到 v5 以上版本。
- 任何框架都可以使用

## 动机
多个独立的构建可以组成一个应用程序，这些独立的构建之间不应该存在依赖关系，因此可以单独开发和部署它们。

这通常被称作微前端，但并不仅限于此。

## 底层概念
我们分为本地模块、远程模块。

其中本地模块即为普通模块，是当前构建的一部分；而远程模块不属于当前构建，并在运行时从所谓的容器加载。

加载远程模块被认为是异步操作。当使用远程模块时，这些异步操作将被放置在远程模块和入口之间的下一个chunk的加载操作中。如果没有chunk加载操作，就不能使用远程模块。

chunk的加载操作通常是通过调用import()实现的，但也支持像 require.ensure或require([...])之类的旧语法。

容器是由容器入口创建的，该入口暴露了对特定模块的异步访问。暴露的访问分为两个步骤：

步骤1：加载模块（异步的）

步骤2：执行模块（同步的）

步骤1将在chunk加载期间完成。步骤2将在与其他（本地和远程）的模块交错执行期间完成。这样一来，执行顺序不受模块从本地转换为远程或从远程转为本地的影响。

容器可以嵌套使用，容器可以使用来自其他容器的模块。容器之间也可以循环依赖。

-----

## 使用只需以下几个步骤
#### home 项目
```
// vue.config.js
module.exports = {
  publicPath: 'http://localhost:8084/',

  chainWebpack: (config) => {
    config
      .plugin('module-federation-plugin')
      .use(require('webpack').container.ModuleFederationPlugin, [{
        name: "home", // 模块名称
        filename: "remoteEntry.js",
        exposes: { // 对外暴露的组件
          './HelloWorld': './src/components/HelloWorld.vue'
        },
    }])
  },

  devServer: {
    port: 8084,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    }
  }
}
```

-----
#### app 项目
```
// vue.config.js
module.exports = {
  publicPath: 'http://localhost:8085/',

  chainWebpack: (config) => {
    config
      .plugin('module-federation-plugin')
      .use(require('webpack').container.ModuleFederationPlugin, [{
        name: "app",
        remotes: { // 导入
          home: 'home@http://localhost:8084/remoteEntry.js',
        },
    }])
  },

  devServer: {
    port: 8085,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    }
  }
}
```
```
// 使用 home 项目里面的组件
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="1111"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    HelloWorld: () => import('home/HelloWorld')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
-----
[体验地址](https://github.com/zch233/vue2-module-federation-demo)
> cd home &amp;&amp; yarn &amp;&amp; yarn serve
> cd app &amp;&amp; yarn &amp;&amp; yarn serve
