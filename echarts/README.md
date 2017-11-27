# 通用脚手架

## 开始之前
项目构建的配置项文件是 `webpack/config.js`，可以配置页面入口，打包生成的目标目录，端口，sourcemap，代理，mock等等，在开发时可根据项目需要进行配置

## 目录结构
  - `src` 下的 `components` 为项目的公共组件，`styles` 为公共样式，`utils` 为公共工具函数集合，`view` 为页面的源代码所在文件夹
  - 每个页面的入口 js 文件、主页模板默认放在 `src/views/` 下，统一使用 `index` 作为文件名，多页面用不同文件夹区分，单页面无需新建文件夹
  - 该项目的 `src`、`mock` 和 `assets` 文件夹下有很多示例代码与文件，在新建项目时尽量删除
## Mock
mock 数据放在 `mock` 文件夹中，可以区分为不同的模块方便开发和维护，程序可以自动找到这些模块，无需手动引用

关于 mock 如何生成随机数据可参考[官方文档](https://github.com/nuysoft/Mock/wiki)

在使用该脚手架生成 mock 接口数据时，需按照如下格式：
```js
{
  // method: GET, POST, etc.
  // route: API URI
  'GET /api/user/:id': {
    code: 0,
    msg: 'success',
    data: {
      name: Mock.Random.name()
    }
  }
}
```

## WebSocket
如果需要 mock `WebSocket`，在 `webpack/config.js` 中开启该配置项。然后在 `mock/websocket/index.js` 中写相应的 `emit` 与 `on` 逻辑。
