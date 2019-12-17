# web前端vue架构开发文档

## 1、简介
此文档为人教数字前端基于vue框架搭建的一套可直接使用的前端架构。

### 1.1 框架
```
Vue+webpack+nginx反向代理+vantUI+sass+node
```

### 1.2 目的
目的在于搭建一套可直接用来开发开后端分离项目的架构。

---

## 2、目录结构
```
frendEnds
│  .babelrc						// 按需引入vant中的组件
│  babel.config.js					// 按需引入vant中的组件
│  package-lock.json				// 锁定安装时的包的版本号和来源
│  package.json					// 依赖的版本管理
│  README.md					// 项目说明手册
│  vue.config.js					// 配置文件
│  yarn.lock						// 由yarn管理，自动生成。如用npm不会影响
│  
├─public						// vue cli自动将index.html放入public中
│      favicon.ico				// 网站头像
│      index.html				// 总的入口文件，挂在id为app的div下动态渲染路由模板
│      
└─src
    │  App.vue					// 是vue的主组件，所有页面都是在App.vue下进行切换的
    │  main.js					// js入口文件，影响全局，作用是引入全局使用的库、公共的样式和方法、设置路由等
    │  
    ├─api						// 放置与后台 api 相关的文件
    │      axiosConfig.js			// axios 库的实例配置文件、使用配置的 axios 实例接入 api 获取数据的函数的集合的文件
    │      http.js				// 后台数据接口统一管理文件
    │      
    ├─assets					// 静态资源
    │  ├─fonts				// 阿里iconfont字体图标库
    │  │      demo.css
    │  │      demo_index.html
    │  │      iconfont.css
    │  │      iconfont.eot
    │  │      iconfont.js
    │  │      iconfont.json
    │  │      iconfont.svg
    │  │      iconfont.ttf
    │  │      iconfont.woff
    │  │      iconfont.woff2
    │  │      
    │  ├─images				// 图片存放
    │  │      gray_2.png
    │  │      logo.png
    │  │      pep.png
    │  │      
    │  └─styles				// 样式
    │      │  404.scss
    │      │  about.scss
    │      │  common.scss
    │      │  home.scss
    │      │  login.scss
    │      │  read.scss
    │      │  
    │      ├─components		// 放置公共组件的样式
    │      │      count.scss
    │      │      headerNav.scss
    │      │      loading.scss
    │      │      tab.scss
    │      │      
    │      └─variable			// 放置全局公共变量样式
    │              variable.scss
    │              
    ├─components				// 放置公共组件
    │      Count.vue
    │      HeaderNav.vue
    │      Loading.vue
    │      Tab.vue
    │      
    ├─markdown				// 放置.md文件描述
    │      pep_dev.md
    │      
    ├─router					// 放置路由设置文件，指定路由对应的组件
    │      index.js
    │      
    ├─store						// 放置vuex需要的状态关联文件，设置公共的 state、mutations 等
    │  │  index.js
    │  │  
    │  ├─modules				// 模块化
    │  │      count.js
    │  │      
    │  └─mutationsType			// mutationsType名字统一管理，得于排错
    │          index.js
    │          
    ├─utils						// 全局可引用的工具包、公共的js方法
    │      cookie.js
    │      filter.js
    │      rem.js
    │      
    └─views					// 放置主要页面的组件。例如登录页、用户信息页等。通常是这里的组件本身写入一些结构，再引入通用模块组件，形成完整的页面
        ├─404
        │      index.vue
        │      
        ├─About
        │      index.vue
        │      
        ├─Home
        │      index.vue
        │      
        ├─Login
        │      index.vue
        │      
        └─Read
                index.vue

```

---

## 3、架构配置

### 3.1 全局配置main.js
项目的js入口文件
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import '../src/utils/rem'
import 'animate.css'
import "./assets/styles/common.scss"
import "./assets/fonts/iconfont.css"
import "@/api/axiosConfig"

// 声明全局axios
Vue.prototype.$axios = axios;

// 全局过滤器
import * as filtration from '@/utils/filter'
Object.keys(filtration).forEach(key => {
  Vue.filter(key, filtration[key])
})

// vant框架按需引入组件
import { CellGroup, Field, NumberKeyboard, Button, Search , Row, Col, Tab, Tabs, Popup, Skeleton, Swipe, SwipeItem, Lazyload, Pagination, Slider } from 'vant';
const vantComponents = [];
vantComponents.push(CellGroup, Field, NumberKeyboard, Button, Search , Row, Col, Tab, Tabs, Popup, Skeleton, Swipe, SwipeItem, Lazyload, Pagination, Slider);
vantComponents.forEach(item => {
  Vue.use(item);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### 3.2 页面配置

#### 3.2.1 组件引入
组件引入需要三个步骤:
* 引入组件
```
import HeaderNav from '@/components/HeaderNav'
```
* 注册组件
```
components: { HeaderNav }
```
* 使用组件
```
<HeaderNav :back="false">首页</HeaderNav>
```
#### 3.2.2 样式引入
```
<style scoped lang="scss">
@import '@/assets/styles/home';
</style>
```

### 3.3 vue.config.js
>VUE CLI官网： https://cli.vuejs.org/zh/config/

#### 3.3.1 vue-cli配置
使用vue-cli3.0搭建项目比之前更简洁，没有了build和config文件夹。

vue-cli3的一些服务配置都迁移到CLI Service里面了，对于一些基础配置和一些扩展配置需要在根目录新建一个vue.config.js文件进行配置。

#### 3.3.2 配置项注解
参考网址：```https://www.jianshu.com/p/b358a91bdf2d```
```
/**

 * 配置项注解

 */

 

module.exports = {

    // 部署应用时的基本 URL

    baseUrl: process.env.NODE_ENV === 'production' ? '192.168.60.110:8080' : '192.168.60.110:8080',

    // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为

    outputDir: 'dist',

    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录

    assetsDir: '',

    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。

    indexPath: 'index.html',

    // 默认在生成的静态资源文件名中包含hash以控制缓存

    filenameHashing: true,

    // 构建多页面应用，页面的配置

    pages: {

      index: {

        // page 的入口

        entry: 'src/index/main.js',

        // 模板来源

        template: 'public/index.html',

        // 在 dist/index.html 的输出

        filename: 'index.html',

        // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>

        title: 'Index Page',

        // 在这个页面中包含的块，默认情况下会包含

        // 提取出来的通用 chunk 和 vendor chunk。

        chunks: ['chunk-vendors', 'chunk-common', 'index']

      },

      // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`，并且如果找不到的话，就回退到 `public/index.html`。

      // 输出文件名会被推导为 `subpage.html`。

      subpage: 'src/subpage/main.js'

    },

    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)

    lintOnSave: process.env.NODE_ENV !== 'production',

    // 是否使用包含运行时编译器的 Vue 构建版本

    runtimeCompiler: false,

    // Babel 显式转译列表

    transpileDependencies: [],

    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建

    productionSourceMap: true,

    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）

  

    crossorigin: '',

    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)

    integrity: false,

    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中

    // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象

    configureWebpack: {},

    // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)

    chainWebpack: () => { },

    // css的处理

    css: {

      // 当为true时，css文件名可省略 module 默认为 false

      modules: true,

      // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS

      // 默认生产环境下是 true，开发环境下是 false

      extract: false,

      // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能

      sourceMap: false,

      //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)

      loaderOptions: { css: {}, less: {} }

    },

    // 所有 webpack-dev-server 的选项都支持

    devServer: {},

    // 是否为 Babel 或 TypeScript 使用 thread-loader

    parallel: require('os').cpus().length > 1,

    // 向 PWA 插件传递选项

    pwa: {},

    // 可以用来传递任何第三方插件选项

    pluginOptions: {}

}
```
#### 3.3.3 此架构中配置
```
module.exports = {

    devServer: {

        host: '0.0.0.0',        // 设置主机地址

        port: 9080,             // 设置默认端口

        open: true,             // 启动项目自动打开浏览器

        proxy: {                // 设置nginx代理

            '/api/': {

                target: 'https://api.github.com/',   // 设置你调用的接口域名

                ws: true,                               // 是否要代理 websockets

                secure: false,                          // 如果是https接口，需要配置这个参数

                changeOrigin: true,                     // 是否跨域

                pathRewrite: {

                    '^/api': '/'                        // 这里可以理解为用'/api'来代替target里面的地址，例如我们调用https://api.github.com/static/textbook/audio_res.json，直接写成'/api/static/textbook/audio_res.json'

                }

            }

        }

    },

    css: {

      loaderOptions: {

        // 给 sass-loader 传递选项

        sass: {

          // @/ 是 src/ 的别名

          // 所以这里假设你有 `src/variables.sass` 这个文件

          prependData: `@import "~@/assets/styles/variable/variable.scss";`

        }       

      }

    }

}
```

---

## 4、框架

### 4.1 前后端分离总架构图
![](https://github.com/zockbell/pep_vue/blob/master/src/assets/images/md_img/image001.png?raw=true)
### 4.2 前端架构设计图
![](https://github.com/zockbell/pep_vue/blob/master/src/assets/images/md_img/image003.png?raw=true)

### 4.3 MVVM架构模式
#### 4.3.1 MVVM的简介
* MVVM 由 Model,View,ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。

* 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

* ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

#### 4.3.2 MVVM的模式图
![](https://note.youdao.com/yws/res/3627/WEBRESOURCEfeaf86b9c04b02e669e321857f8c9bed)

#### 4.3.3 vue的双向数据绑定的原理
![](https://note.youdao.com/yws/res/3640/WEBRESOURCEb92f2eb9af7b93585c818cdfe5b64b29)

* Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。

* Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。

* Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

* Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update 方法。

#### 4.3.4 url到页面显示的过程
![image](https://note.youdao.com/yws/res/3642/WEBRESOURCEd1bbfde07e101f2c9cec91e861a9efea)

#### 4.3.5 浏览器端显示HTML的过程
![image](https://note.youdao.com/yws/res/3644/WEBRESOURCE13c6ef741ad2244e4d7f3729f4645720)

---

## 5. 组件
> 组件是一个个的可复用单元，单页面程序的组件跟传统的UI组件稍有不同，不仅仅包含了样式，也包含了容器元素。可以泛化组件，抽取出一些参数，根据参数来渲染为不同的视图。
### 5.1 全局组件
一次注册，遍地使用，方便。适用于高频使用的组件，会增加性能开销。

### 5.2 组件间的通讯
将视图分为一个个的组件，增强复用性的同时也造成了彼此状态的隔离，用户看到的是一个页面，页面里的一个个组件之间沟通交流是无法避免的事实—需要通讯。我们将之分为父子组件间的通讯和非父子间通讯。

### 父组件跟子组件通信
> 父组件跟子组件通信

需要注意的是：
* prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。
* 每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。
* 例子：
```
father.vue
```
```
<template>
  // v-bind来绑定动态数据，静态数据可以不用v-bind指令(:是v-bind的简写)
  <child-component :message='message'></child-component>
</template>

<script>
import child from 'child.vue';
export default {
  name: "father",
  data() {
    return {
      message: 'hello'
    }
  },
  components: {
    'child-component': child
  }
}
</script>
```

```
child.vue
```
```
<template>
  <div class='child'>{{ message }}</div>
</template>

<script>
export default {
  name: "child",
  props: ['message']
}
</script>
```
```
prop验证
```
```
<script>
export default {
  name: "child",
  props: {
    // 基础类型检测 (`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
}
</script>
```

### 5.4 子组件如何将数据传到父组件中
> 子组件的变化通过 emit 事件的形式通知到父组件，父组件通过监听子组件的emit事件来知晓变化。

例子：
```
father.vue
```
```
<template>
  // 父组件监听listenChild事件，执行getChildData方法，并且拿到传递过来的数据(@是v-on的简写)
  <child-component @listenToChild='getChildData'></child-component>
</template>

<script>
import child from 'child.vue';
export default {
  name: "father",
  methods: {
    getChildData (val) {
      console.log(`子组件传递过来的数据: ${val}`); // hello
    }
  },
  components: {
    'child-component': child
  }
}
</script>
```
```
child.vue
```
```
<template>
  			<div class='child'></div>
</template>

<script>
export default {
  name: "child",
  created () {
    // 在需要的传递数据的时候调用sendData方法，这里模拟调用
    this.sendData();
  },
  methods: {
    sendData () {
      this.$emit('listenToChild', 'hello');
    }
  }
}
</script>
```

### 5.5 非父子组件间的通讯
* 可以使用状态管理模式 vuex,来管理组件之间状态的共享。
* 可以用过一个vue实例Bus作为媒介，要相互通信的兄弟组件之中，都引入Bus，之后通过分别调用Bus事件触发emit和̲监听on来实现组件之间的通信和参数传递。类似与子传父，只不过是利用一个新的vue示例作为媒介，而不是当前vue示例(this)

例子：
```
bus.js
```
```
mport Vue from 'vue';
export default new Vue;
```
---
```
a.vue
```
```
<template>
  <div class='a'></div>
</template>

<script>
import Bus from 'bus.js' ;
export default {
  name: "a",
  created() {
    // 在需要的传递数据的时候调用sendData方法，这里模拟调用
    this.sendData();
  },
  methods: {
    sendData () {
      Bus.$emit('listenToA', 'hello');
    }
  }
}
</script>
```
---
```
b.vue
```
```
<template>
  <div class='b'></div>
</template>

<script>
import Bus from 'bus.js';
export default {
  name: "b",
  monted() {
    Bus.$on('listenToA', this.getAData);
  },
  methods: {
    getAData (val) {
      console.log(`a组件传递过来的数据: ${val}`); // hello
    }
  }
}
</script>
```
---

## 6. 插件
### 6.1 Vue-router 路由
#### 6.1.1 插件简介   
   * 介绍：在web开发中，路由是指根据url分配到对应的处理程序。
   * 作用：通过管理url,实现url和组件的对应和通过url进行组件之间的切换，加载单个HTML页面（SPA），并在用户与应用程序交互时动态更新该页面
![image](https://note.youdao.com/yws/res/3730/WEBRESOURCE491ab307fc2eebaac1d6c82d299d0f66)

   * 官网网址：```https://router.vuejs.org/zh/guide/#html```
   * 安装模块: ```npm install vue-router --save```

#### 6.1.2 插件使用
   * 引入
   ```
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   Vue.use(VueRouter)
   ```
   ![image](https://note.youdao.com/yws/res/3761/WEBRESOURCE53e20486b2870460fd269ee6d885ac8f)
   
* router/index.js详细配置
   * 创建路由实例对象
   ```
   new VueRouter({

    ...配置参数
    
    })
    ```
    *  注入vue选项参数
    ```
    new Vue({
        router
    })
    ```
    ![image](https://note.youdao.com/yws/res/3772/WEBRESOURCE00d7ab8b1e3d866b023034d3a3cf8bf8)
    
    * 告诉路由渲染的位置
    ```App.vue```中添加 ```<router-view></router-view>```
    
    * 路由跳转
    
    ![image](https://note.youdao.com/yws/res/3779/WEBRESOURCEcf6cf14e415fae58194e9e04120bfb0e)

#### 6.1.3 开始一个使用
![image](https://note.youdao.com/yws/res/3789/WEBRESOURCE0612fddae23544be62dbde4e026eb507)

#### 6.1.4 命名视图
在同级同时展示多个视图，而不是嵌套展示

![image](https://note.youdao.com/yws/res/3795/WEBRESOURCE61087a15b6d9f24c510b668df2939dda)

#### 6.1.5 动态路径
匹配到的所有路由，全都映射到同一个组件

路径：```/read /:readId```   ```readId```为动态路径参数

获取参数：路由信息对象的params

#### 6.1.6 构造选项配置
- routes 用来配置路由对应信息

- mode 配置路由模式 hash | history

- base 应用的基路径

- linkActiveClass 激活路由的class 类名

- scrollBehavior 滚动行为

本架构中配置如下：
```
const router = new VueRouter({

  mode: 'history',

  base: process.env.BASE_URL,

  routes,

  scrollBehavior(to, from, savePosition){

    if(savePosition){

      return savePosition;

    } else {

      return {x: 0, y:0}

    }

  }

})
```
![image](https://note.youdao.com/yws/res/3807/WEBRESOURCE4b7dfcac87dcc00eb0db1b18a858cf72)

#### 6.1.7 router-link配置项
- to 表示目标路由的链接

- tag 指定渲染的标签，会监听导点击，触发导航

- active-class 设置 链接激活时使用的 CSS 类名

- exact 是否给该激活链接类名

- event 声明可以用来触发导航的事件

- replace 导航不会留下历史记录

- append 为相对路径添加基路径

#### 6.1.8 对组件注入
通过在 Vue 根实例的 router 配置传入 router 实例

- $router  router实例对象
- $route 当前激活的路由信息对象，每个组件实例都会有。
- beforeRouteEnter()  进入组件前钩子函数
- beforeRouteLeave()  离开组件前钩子函数

#### 6.1.9 过渡动画（以淡入淡出为例子）
提供了transition的封装组件，添加过渡动画

添加删除css类名

1. template区域
```
<!-- 动画 -->
<transition name="fadeIn">
  <!-- 需要缓存的路由页面 -->
  <keep-alive>       
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
</transition>
```
![image](https://note.youdao.com/yws/res/3828/WEBRESOURCE07b5d9ce8cec79944fae7e30208f47ee)

2. style区域
```
.fadeIn-enter {
  opacity: 0;
}
.fadeIn-enter-active {
  transition: all .2s linear;
  opacity: 1;
}
.fadeIn-leave-active {
  transition: all .2s linear;
  opacity: 0;
}
```
![image](https://note.youdao.com/yws/res/3834/WEBRESOURCE8b04a953009cce936d5ba2e08ad2d91c)

3. 官网动画传送门
> https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%8D%95%E4%B8%AA%E8%B7%AF%E7%94%B1%E7%9A%84%E8%BF%87%E6%B8%A1

> https://github.com/vuejs/vue-router/blob/dev/examples/transitions/app.js

4. 过渡的css类名
* v-enter: 定义进入过渡的开始状态
* v-enter-active: 定义进入活动状态
* v-enter-to: 定义进入的结束状态
* v-leave: 定义离开过渡的开始状态
* v-leave-active: 定义离开活动状态
* v-leave-to: 定义离开的结束状态

**使用name属性改变类名前缀**

![image](https://note.youdao.com/yws/res/3849/WEBRESOURCEd632e4c891177d8741d7514515ac7b27)

5. 过渡模式

* in-out: 新元素先进行过渡，完成之后当前元素过渡离开

* out-in: 当前元素先进行过渡，完成之后新元素过渡进入

#### 6.1.10 路由元信息
在路由配置中meta可以配置一些数据，用在路由信息对象中

访问meta中数据：```$route.meta```

本架构中使用如下：

![image](https://note.youdao.com/yws/res/3857/WEBRESOURCEe1a55a70514ae9b96f8b27b36466bbae)

![image](https://note.youdao.com/yws/res/3860/WEBRESOURCEb1b8e31e0a0c4a4f5cb7b070f55592ea)

#### 6.1.11 编程式导航

借助于 router 的实例方法，通过编写代码来实现导航的切换

* back  回退一步
* forward 前进一步
* go      指定前进回退步数
* push 导航到不同url，向 history 栈添加一个新的记录
* replace 导航到不同url，替换 history 栈中当前记录

#### 6.1.12 导航钩子函数
导航发生变化时，导航钩子主要用来拦截导航，让它完成跳转或取消
1. 执行钩子函数位置
* router全局
* 单个路由
* 组件中

2. 钩子函数
* router实例上：beforeEach、afterEach
* 单个路由中：beforeEnter
* 组件内的钩子：beforeRouteEnter、beforeRouteUpdate 、beforeRouteLeave

3. 钩子函数接收的参数
* to: 要进入的目标 路由对象    到哪里去
* from: 正要离开导航的路由对象  从哪里来
* next: 用来决定跳转或取消导航

#### 6.1.13 懒加载
把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
1. Vue异步组件
```
{

   components: {

   custom: (resolve,reject) => {}

   }

}
```
2. webpack代码分割功能
* require.ensure代码分块
* require.ensure(依赖,回调函数,[chunk名字])
* import函数

#### 6.1.14 服务器配置
1.   Nginx配置
```
location / {

    root /home/我的应用跟目录;

    try_files $uri $uri/ /index.html =404;

}
```
2.   Appache配置
```
<IfModule mod_rewrite.c>

  RewriteEngine On

  RewriteBase /

  RewriteRule ^index\.html$ [L]

  RewriteCond %{REQUEST_FILENAME} !-f

  RewriteCond %{REQUEST_FILENAME} !-d

  RewriteRule . /index.html [L]

</IfModule>
```

### 6.2 Vuex状态管理
#### 6.2.1 插件简介
* Vuex是什么
   * 专为 Vue.js 应用程序开发的 状态管理模式
   * 采用集中式存储管理应用的所有组件的状态
   * 以相应的规则保证状态以一种可预测的方式发生变化
* 状态
   *  组件内部状态：仅在一个组件内使用的状态(data 字段)
   *  应用级别状态：多个组件共用的状态
* 什么情况下使用Vuex
   * 多个视图依赖于同一状态
   * 来自不同视图的行为需要变更同一状态
*   网址
> https://vuex.vuejs.org/zh/

#### 6.2.2 插件使用
1. 安装vuex模块
```
npm install vuex --save
```
2. 作为插件使用
```
Vue.use(Vuex)
```
3. 定义容器
```
new Vuex.Store()
```
4. ```main.js```注入根实例
```
new Vue({

  router,

  store,

  render: h => h(App)

}).$mount('#app')
```

#### 6.2.3 Vuex核心概念
1. ```store```：类似容器，包含应用的大部分状态, 一个页面只能有一个store, 状态存储是响应式的,不能直接改变 store 中的状态，唯一途径显式地提交mutations

2. ```State```: 包含所有应用级别状态的对象

3. ```Getters```: 在组件内部获取 store 中状态的函数

4. ```Mutations```: 唯一修改状态的事件回调函数

5. ```Actions```: 包含异步操作、提交mutation改变状态

6. ```Modules```： 将 store 分割成不同的模块

#### 6.2.4 Vuex的流程图

![image](https://note.youdao.com/yws/res/3923/WEBRESOURCE8d015b391be72246fb0e8c73ef34fdcd)

#### 6.2.5 此架构中vuex的使用

1. 目录结构

![image](https://note.youdao.com/yws/res/3931/WEBRESOURCEd1a7e04ef9266b5a28ea791aa56b2090)

2. 将store分modules引用，便于管理

![image](https://note.youdao.com/yws/res/3934/WEBRESOURCEd46da634d62eae14fa7f3fd1da98b083)

3. 在每个模块中定义
```
export default{

        state: {

      count: 100

},

getters: {

  filterCount: (state) => state.count >= 120 ? 120 : state.count

},

mutations: {

},

actions: {

}

}
```

4. 将mutaions中的名称抽离，统一管理，利于排错

```
export const INCREMENT = 'INCREMENT';   // 增加

export const DECREMENT = 'DECREMENT';   // 减少
```

#### 6.2.6 Vuex辅助函数
1.  使用，直接引入解构赋值
```
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
```
2.  辅助函数中的调用：
* ```mapState```
```
...mapState('count', ['count'])
```

* ```mapGetters```
```
computed: {

...mapGetters('count', {

  num2: 'filterCount'

}),

...mapState('count', ['count'])

}
```

* ``` mapMutations```
```
...mapMutations('count', { // 使用辅助函数再传参，需要在@click方法调用时传参

   deHandle: Types.DECREMENT

})
```

* ```mapActions```
```
...mapActions('count', {

   addHandle: 'addAction'

}),
```

#### 6.2.7 vuex中logger插件使用
1. 引用
```Stroe/index.js``` 中使用 ```import```

```
import logger from 'vuex/dist/logger'
```

2. 在实例的plugins中注册
plugins: [logger()]

此架构中代码：
```
export default new Vuex.Store({

  strict: true,  // 只能通过mutations来更改状态，不支持异步

  modules: {

    count

  }, 

  plugins: [logger()]  // 打印vuex日志插件

})
```

3.  控制台打印
成功将上一状态和下一状态打印出来
![image](https://note.youdao.com/yws/res/3971/WEBRESOURCE4a066f2717ccb358a34be382931d801d)

### 6.3 qs
#### 6.3.1 插件简介
1.  介绍
具有嵌套支持的querystring解析器，具有一些附加安全性的querystring解析和字符串化库。
2.  网址
> https://github.com/ljharb/qs
3.  安装
```
npm install qs
```

#### 6.3.2 插件使用
1. 使用
```
import qs from "qs"


var assert = require('assert');

var obj = qs.parse('a=c');

assert.deepEqual(obj, { a: 'c' });

var str = qs.stringify(obj);

assert.equal(str, 'a=c');
```

2. 此架构中使用，对登录接口入参格式的使用
```
/ 登录

export async function Login(data) {

    const res = await axios.post("user/ak/"+window.platform_key+"/login.anys", qs.stringify(data));

    return res.data;

}
```

### 6.4  Axios 简洁且高效的http库
#### 6.4.1 插件简介
1.  介绍
> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 的服务端通信库。
2.  特征
* 支持 Promise API

* 拦截请求和响应

* 转换请求和响应数据

* 取消请求

* 动转换JSON数据
3.  网址
> https://github.com/axios/axios

> http://www.axios-js.com/  axios中文网

4.  安装命令
```
npm install axios 或 yarn add axios
```
5.  推荐数据模拟网址
```
http://easy-mock.com
```

#### 6.4.2 插件使用
1. 在需要的模块中引入
```
import Vue from 'vue'

import axios from 'axios'
```

2. 此架构中使用如下
```
export async function Read() {

    const res = await axios.get('/static/repository/audio_res.json');

    return res.data;

}
```
3. 语法
```
axios(config)
```
```
axios[method]()
```
**返回值为promise**

4. 支持的请求方式
* axios.get(url[, config])

* axios.post(url[, data[, config]])

* axios.delete(url[, config])

* axios.head(url[, config])

* axios.options(url[, config])

* axios.put(url[, data[, config]])

* axios.patch(url[, data[, config]])

5. 自定义请求实例
* 创建
```
axios.create(config)
```
*  配置
```
{

    baseURL: '',
    
    timeout: 1000,
    
    headers: {},
    
    responseType:'json',
    
    params:{},
    
    transformRequest:[]      只适合PUT、POST和PATCH
    
    transformResponse:[]
    
    validateStatus:function(){}
    
    cancelToken

}
```

6. 取消请求
*  创建取消请求令牌
```
var CancelToken = axios.CancelToken;

var source = CancelToken.source();
```
* 配置
```
cancelToken: source.token
```
* 捕获取消错误
```
if (axios.isCancel(error)) {

   console.log(error.message);

}
```
* 调用取消
```
source.cancel('操作被用户取消')
```

7. 并发请求
```
axios.all(iterable)

axios.spread(callback)
```

8. 拦截器
*  全局拦截器
   *  拦截请求
   ```
   axios.interceptors.request.use（function（config）{

      //在发送请求之前做某事
    
      return config;
    
    }，function（error）{
    
      //请求错误时做些事
    
       return Promise.reject（error）;
    
    }）;
   ```
   *  拦截响应
   ```
   axios.interceptors.response.use()
   ```
*  取消拦截
```
axios.interceptors.request.eject(myInterceptor);
```

### 6.5 Vant
#### 6.5.1 插件简介
1. 介绍
> 轻量、可靠的移动端Vue组件库，来自有赞
2. 网址
> https://github.com/youzan/vant

> https://youzan.github.io/vant/#/zh-CN/intro

#### 6.5.2 插件引入和使用
1.  安装
```
npm i vant –S  or   yarn add vant
```
2.  按需引入组件
* 在.babelrc 中添加配置
```
{

  "plugins": [

    ["import", {

      "libraryName": "vant",

      "libraryDirectory": "es",

      "style": true

    }]

  ]

}
```

* babel.config.js 中配置
```
module.exports = {

  plugins: [

    ['import', {

      libraryName: 'vant',

      libraryDirectory: 'es',

      style: true

    }, 'vant']

  ]

};
```

* ```main.js```中配置
将按需引用的组件直接填写在此处
```
// vant框架按需引入组件

import { CellGroup, Field, NumberKeyboard, Button, Search , Row, Col, Tab, Tabs, Popup, Skeleton, Swipe, SwipeItem, Lazyload, Pagination, Slider } from 'vant';

const vantComponents = [];

vantComponents.push(CellGroup, Field, NumberKeyboard, Button, Search , Row, Col, Tab, Tabs, Popup, Skeleton, Swipe, SwipeItem, Lazyload, Pagination, Slider);

vantComponents.forEach(item => {

  Vue.use(item);

})
```

### 6.6 Sass
#### 6.6.1 插件简介
1. 介绍
> 一款成熟、稳定、强大的专业级css扩展语言
2. 网址
> https://www.sass.hk/
3. 安装
```
npm install -g sass
```

#### 6.6.2 插件使用
1. 公共组件使用
> 参考Vue CLI官网  https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9

在```vue.config.js```中配置
```
module.exports = {

             css: {

      loaderOptions: {

        // 给 sass-loader 传递选项

        sass: {

          // @/ 是 src/ 的别名

          // 所以这里假设你有 `src/variables.sass` 这个文件

          prependData: `@import "~@/assets/styles/variable/variable.scss";`

        }       

      }

    }
}
```

2. 组件样式引用
```
<style scoped lang="scss">

@import '@/assets/styles/home';

</style>
```

### 6.7 animate.css

#### 6.7.1 插件简介
1.   介绍
> 一款强大的预设css3动画库
2.   网址
> https://github.com/daneden/animate.css
3.   安装
```
npm install animate.css –save    or   yarn add animate.css
```

#### 6.7.2 插件使用
1. 引入
在```main.js```中直接引入
```
import 'animate.css'
```

2. 要给添加动画的标签添加class
```
<h1 class="animated infinite pulse iconfont icon-Favorites"></h1>
```

---

## 7. 调试
### 7.1  使用Chrome扩展插件vue-devtools进行调试

> Github下载地址：https://github.com/vuejs/vue-devtools

![image](https://note.youdao.com/yws/res/4106/WEBRESOURCEe7fbb7be3c35bf425869374c9ebedb13)

![image](https://note.youdao.com/yws/res/4110/WEBRESOURCE8a223155f1137482f74e0d6d1e855cb1)

![image](https://note.youdao.com/yws/res/4113/WEBRESOURCE73cca390974ee8a222139147294a8827)

![image](https://note.youdao.com/yws/res/4117/WEBRESOURCEf80cce21118967f22be49c53796d07fc)

### 6.7.2 使用vuex中looger可在console控制台中查看状态

![image](https://note.youdao.com/yws/res/4122/WEBRESOURCEe84c7dfea2bd6b95501796bc2d3083e3)

---

## 8. vue ui图形化界面
> vue-cli 3.x新增vue ui图形化界面，Vue的升级我认为最厉害之处在于建设了一个属于vue的资源生态圈，把能使用的资源收归起来管理，控制台的ui不仅非常舒服，功能也十分强大

> 在2.x中的命令控制在此ui可视化界面中同样可以完成所有操作。

### 8.1 全局安装vue-cli
```
yarn global add @vue/cli

// 检查安装是否成功

vue -V

// 4.1.1
```

### 8.2 初始化 vue ui
执行命令：
```
vue ui
```

![image](https://note.youdao.com/yws/res/4134/WEBRESOURCE5937860800b799064f8ff78032342841)

### 8.3  项目、创建、导入

![image](https://note.youdao.com/yws/res/4138/WEBRESOURCE9f6495d9b69b795aa3ded0fc28639492)

在此界面可直接创建和导入，我选择将此架构导入，如图

![image](https://note.youdao.com/yws/res/4143/WEBRESOURCEbccc65a2883b584011352d156082415b)

#### 8.3.1 左侧菜单介绍 
1.   插件：可以从插件商店搜索并下载安装各种网上的插件

![image](https://note.youdao.com/yws/res/4148/WEBRESOURCE86ea005e90d8df2c23b1582872fc3f6f)


2.   依赖：对已安装对插件配置管理

![image](https://note.youdao.com/yws/res/4152/WEBRESOURCEa1ce3b60c4df5480d39f204cd65bdefb)

3.  配置： vue cli的配置，功能是对vue.config.js的映射

![image](https://note.youdao.com/yws/res/4157/WEBRESOURCE90974bc2c64a32662dbaea594e0addba)

4. 任务：就是项目可运行的命令，如打包、本地调试。

![image](https://note.youdao.com/yws/res/4161/WEBRESOURCE9ded282d474c253813e886e73464d2a8)

![image](https://note.youdao.com/yws/res/4164/WEBRESOURCE220c93f35542b0c4c4de0b6d06d335df)

![image](https://note.youdao.com/yws/res/4166/WEBRESOURCE110f2ffe90731f415f95f4b80b8b6c69)

---

## 9. 项目启动和打包部署

### 9.1 项目安装依赖
```
npm install   or  yarn install
```

### 9.2 开发环境运行
```
npm run serve  or  yarn run serve
```

### 9.3 项目打包
```
npm run build  or yarn build
```

### 9.4 项目部署，服务器Nginx配置
```
location / {

root /home/我的应用跟目录;

try_files $uri $uri/ /index.html =404;

}
```
-----
感谢支持，如有问题随时指出，谢谢~
