#### Install 
    cnpm  install

#### Run    

```bash
npm start
``` 
> 打开浏览器 http://localhost:8081

#### Build 
```bash
npm run build
``` 
>项目打包后将存放在build文件

```bash
├── /build/          # 打包输出
├── /app/         # 公共文件
│ └── index.html     
├── /src/           # 项目源码
│ ├── /components/  # 图片
│ ├── /components/  # UI组件
│ ├── /models/      # 数据模型
│ ├── /json/        # 地图数据
│ ├── /pages/       # 页面
│ ├── /services/    # 模拟数据
│ ├── /router/      # 路由配置
│ ├── /utils/       # 工具函数
│ │ ├── pinyin.js   # 汉字转拼音方法
│ │ └── request.js  # 公共函数
│ ├── router.js      # 路由入口
│ ├── index.js      # 入口文件
│ ├── config.js     # 项目路径配置
├── package.json    # 项目信息
├── /antd/          # antd样式
├── /icon/          # 按钮图标
├── /iconfont/      # antd字体库
└── webpack.config.js
``` 