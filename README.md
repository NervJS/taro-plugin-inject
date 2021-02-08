# @tarojs/plugin-inject

> 可以为小程序平台注入公共的组件、API 等逻辑

## 安装

在 Taro 项目根目录下安装

```bash
$ npm i @tarojs/plugin-inject --save
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro `3.1.0` 的最新版本。

修改项目 `config/index.js` 中的 plugins 配置为如下

```js
const config = {
  ...
  plugins: [
    ['@tarojs/plugin-inject', {
      // 配置项
    }]
  ]
  ...
}
```

### 配置项

插件可以接受如下参数：

| 参数项 | 类型 | 用途 |
| :-----| :---- | :---- |
| syncApis | array | 新增同步 API |
| asyncApis | array | 新增异步 API |
| components | object | 修改、新增组件的属性 |
| voidComponents | array, function | 设置组件是否可以渲染子元素 |
| nestElements | object, function | 设置组件模版的循环次数 |

### syncApis

插件支持为小程序新增**同步的** API。

用法：

```js
const config = {
  plugins: [
    ['@tarojs/plugin-inject', {
      // 配置需要新增的 API
      syncApis: ['a']
    }]
  ]
}
```

运行时即可调用此新增的 API：

```js
Taro.a()
```

### asyncApis

插件支持为小程序新增**异步的** API。

用法：

```js
const config = {
  plugins: [
    ['@tarojs/plugin-inject', {
      // 配置需要新增的 API
      asyncApis: ['b']
    }]
  ]
}
```

运行时即可调用此新增的 API：

```js
Taro.b()
  .then(() => {})
  .catch(() => {})
```

### components

插件支持为小程序的组件**修改属性默认值**或**新增属性**。

`components` 属性的[设置规范](https://taro-docs.jd.com/taro/docs/next/platform-plugin-base#31-%E7%BC%96%E5%86%99-componentsts)

用法：

```js
const config = {
  plugins: [
    ['@tarojs/plugin-inject', {
      components: {
        // 为 Text 组件新增了 'x-props' 属性和 'bindYEvent' 事件
        Text: {
          'x-props': "'hello'",
          bindYEvent: ''
        }
      }
    }]
  ]
}
```

### voidComponents

在 `voidComponents` 里的组件**不可以渲染子组件**。

Taro3 默认下述组件**不渲染子组件**以节省模板体积：

```js
export const voidElements = new Set([
  'progress',
  'icon',
  'rich-text',
  'input',
  'textarea',
  'slider',
  'switch',
  'audio',
  'ad',
  'official-account',
  'open-data',
  'navigation-bar'
])
```

但是我们可以通过配置进行修改：

```js
const config = {
  plugins: [
    ['@tarojs/plugin-inject', {
      // array：新增 View 组件也不需要渲染子组件
      voidComponents: ['view']，
      // function：直接修改 voidComponents
      voidComponents (origin) {
        // 现在 audio 能渲染子组件了
        origin.delete('audio')
        return origin
      },
    }]
  ]
}
```

### nestElements

对于不支持模板递归的小程序（如微信、QQ、京东小程序），Taro3 默认下述组件的模板能递归自身：

```js
// 正数代表最多可递归 N 次
// -1 代表最多可递归 config.baseLevel 次
export const nestElements = new Map([
  ['view', -1],
  ['catch-view', -1],
  ['cover-view', -1],
  ['static-view', -1],
  ['pure-view', -1],
  ['block', -1],
  ['text', -1],
  ['static-text', 6],
  ['slot', 8],
  ['slot-view', 8],
  ['label', 6],
  ['form', 4],
  ['scroll-view', 4],
  ['swiper', 4],
  ['swiper-item', 4]
])
```

默认原生自定义组件可递归 `config.baseLevel` 次，因为 Taro 不清楚原生自定义组件是否存在可递归自身的情况。例如 `vant-weapp` 中，`van-image` 组件不存在递归自身的情况，而 `van-cell` 这种容器类组件可能递归自身。

但是对 `van-image` 组件循环 `config.baseLevel` 次是不必要的，会增大小程序包体积，针对这种情况我们可以通过配置进行修改：

```js
const config = {
  plugins: [
    ['@tarojs/plugin-inject', {
      // object：修改 swiper、swiper-item 组件的最大循环次数
      nestElements: {
        'swiper': 2,
        'swiper-item': 2
      },
      // function：直接修改 nestElements
      nestElements (origin) {
        // 现在 van-image 只能循环一次了
        origin.set('van-image', 1)
        return origin
      },
    }]
  ]
}
```
