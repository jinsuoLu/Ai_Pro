import router from '@/router'
import store from '@/store'
import { asyncRoutes } from '@/router'

const whiteList = ['/login', '/register', '/404', '/401']

// 检查路由是否已存在
function hasRoute(name) {
  const routes = router.getRoutes()
  return routes.some(route => route.name === name)
}

router.beforeEach(async(to, from, next) => {
  console.log('[路由守卫] 进入:', to.path, '来自:', from.path)
  
  const hasToken = store.getters['user/accessToken']
  console.log('[路由守卫] Token存在:', !!hasToken)
  
  if (hasToken) {
    if (to.path === '/login') {
      console.log('[路由守卫] 已登录，跳转首页')
      next({ path: '/' })
    } else {
      const hasPermissions = store.getters['user/permissions'] && store.getters['user/permissions'].length > 0
      console.log('[路由守卫] 有权限:', hasPermissions)
      
      if (hasPermissions) {
        console.log('[路由守卫] 权限已获取，放行')
        next()
      } else {
        try {
          console.log('[路由守卫] 正在获取用户信息...')
          await store.dispatch('user/getUserInfo')
          const permissions = store.getters['user/permissions']
          console.log('[路由守卫] 获取权限:', permissions)
          
          console.log('[路由守卫] 正在注册动态路由...')
          const accessedRoutes = await store.dispatch('routes/setRoutes', permissions)
          
          // 注册动态路由
          asyncRoutes.forEach(route => {
            if (!hasRoute(route.name)) {
              router.addRoute(route)
              console.log('[路由守卫] 已注册路由:', route.path)
            }
          })
          
          console.log('[路由守卫] 所有路由:', router.getRoutes().map(r => r.path))
          console.log('[路由守卫] 重定向到:', to.path)
          
          // 使用 replace: true 避免历史记录问题
          next({ ...to, replace: true })
        } catch (error) {
          console.error('[路由守卫] 获取信息失败:', error)
          await store.dispatch('user/resetAccessToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('[路由守卫] 白名单页面，放行:', to.path)
      next()
    } else {
      console.log('[路由守卫] 未登录，跳转登录页')
      next(`/login?redirect=${to.path}`)
    }
  }
})
