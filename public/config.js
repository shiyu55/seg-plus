window.TcbCmsConfig = {
  // 可用区，默认上海
  region: 'ap-shanghai',
  // 路由方式：hash 或 browser
  history: 'hash',
  // 环境 Id
  envId: 'segplus-1772f8',
  // 禁用通知
  disableNotice: false,
  // 禁用帮助按钮
  disableHelpButton: false,
  // 云接入默认域名/自定义域名 + 云接入路径，不带 https 协议符
  // https://console.cloud.tencent.com/tcb/env/access
  cloudAccessPath: 'seg.plus/tcb-ext-cms-service',

  // ===
  // 下面的配置为选择性配置
  // ===

  // 容器模式时的访问路径
  containerAccessPath: 'seg.plus/tcb-ext-cms-service-container',
  // 微信小程序 Id
  mpAppID: '',
  // CMS 文案配置 优先级别高
  cmsTitle: '赛鸽 Plus',
  // Logo 图片
  cmsLogo: './icon.svg',
  // 文档链接
  cmsDocLink: 'seg.plus/api',
  // 帮助链接
  cmsHelpLink: 'seg.plus/api',
  // 产品官网链接
  officialSiteLink: 'seg.plus/api',
  // 产品名
  appName: '赛鸽',
}
