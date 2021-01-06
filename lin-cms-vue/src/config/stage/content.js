const contentRouter = {
  route: null,
  name: null,
  title: '期刊管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  order: 3,
  inNav: true,
  children: [
    {
      route: '/content/list',
      name: 'content',
      title: '内容管理',
      type: 'view', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'views/content/List.vue',
      inNav: true
    },
    {
      route: '/content/flow',
      name: 'flow',
      title: '最新期刊',
      type: 'view', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'views/content/Flow.vue',
      inNav: true
    }
  ]
}

export default contentRouter
