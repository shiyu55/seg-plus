// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import platformConfig from './platform';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  base: '/',
  // 静态资源路径
  publicPath: './',
  history: {
    // 静态托管部署，需要使用 hash 模式
    type: 'hash',
    // type: 'browser',
  },
  // 定义变量
  define: {
    ...platformConfig.define,
  },
  layout: {
    name: platformConfig.layout.name,
    locale: false,
    siderWidth: 208,
  },
  antd: {},
  dva: {
    hmr: true,
  },
 
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'layout-header-background': '#104560', // 自定义 dark siderMenu 需要修改Antd的theme layout-header-background, menu-dark-submenu-bg, menu-dark-item-active-bg
    'menu-dark-submenu-bg': '#0B3043',
    'menu-dark-item-active-bg': '#2a6590',
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},

});
