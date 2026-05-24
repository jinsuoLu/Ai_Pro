/**
 * @description 导出默认通用配置
 */

// 部署模式配置
// - 'local': 本地部署（构建到 dist 目录，相对路径）
// - 'github': GitHub Pages 部署（需要设置仓库名作为公共路径）
const DEPLOY_MODE = process.env.VUE_APP_DEPLOY_MODE || 'local'

// GitHub Pages 公共路径（替换为你的仓库名，例如 'vue-admin-better'）
const GITHUB_REPO_NAME = process.env.VUE_APP_GITHUB_REPO || ''

let publicPath

if (process.env.NODE_ENV === 'development') {
  // 开发环境：使用空路径
  publicPath = ''
} else {
  // 生产环境：根据部署模式选择
  switch (DEPLOY_MODE) {
    case 'github':
      // GitHub Pages 部署模式：使用仓库名作为公共路径
      publicPath = GITHUB_REPO_NAME ? `/${GITHUB_REPO_NAME}/` : '/'
      break
    case 'local':
    default:
      // 本地部署模式：使用相对路径
      publicPath = './'
      break
  }
}

const setting = {
  // 开发以及部署时的URL
  publicPath,
  // GitHub 仓库名称（用于 GitHub Pages 部署）
  githubRepoName: GITHUB_REPO_NAME,
  // 生产环境构建文件的目录名
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 进行编译的依赖
  transpileDependencies: [],
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: 'Admin Better',
  //简写
  abbreviation: 'vab',
  //开发环境端口号
  devPort: '8090',
  //copyright
  copyright: 'zxwk1998',
  //是否显示页面底部自定义版权信息
  footerCopyright: true,
  //是否显示顶部进度条
  progressBar: true,
  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  // 路由模式，可选值为 history 或 hash
  routerMode: 'hash',
  //不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/401'],
  //加载时显示文字
  loadingText: '正在加载中...',
  //token名称
  tokenName: 'accessToken',
  //token在localStorage、sessionStorage存储的key的名称
  tokenTableName: 'vue-admin-better-2024',
  //token存储位置localStorage sessionStorage
  storage: 'localStorage',
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  logo: 'vuejs-fill',
  //是否显示在页面高亮错误
  errorLog: ['development'],
  //是否开启登录拦截
  loginInterception: true,
  //是否开启登录RSA加密
  loginRSA: true,
  //intelligence和all两种方式，前者后端权限只控制permissions不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
  authentication: 'intelligence',
  //vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  //vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOpended: ['/vab'],
  //需要加loading层的请求，防止重复提交
  debounce: ['doEdit'],
  //需要自动注入并加载的模块
  providePlugin: {},
  //代码生成机生成在view下的文件夹名称
  templateFolder: 'project',
  //是否显示终端donation打印
  donation: false,
}
module.exports = setting
