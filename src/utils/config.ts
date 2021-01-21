const InnerDefaultValue: Partial<ITcbCmsConfing> = {
  appName: '赛鸽Plus',
  cmsTitle: '赛鸽 Plus',
  cmsLogo: './icon.svg',
  cmsDocLink: 'https://github.com/baiheinet/seg-plus',
  cmsHelpLink: 'https://support.qq.com/products/301503',
  officialSiteLink: 'https://github.com/baiheinet/seg-plus',
};

/**
 * 获取 CMS 配置，适配小程序 OR 腾讯云
 */
export const getCmsConfig = (key: keyof ITcbCmsConfing, defaultValue?: any) => {
  // 获取 CMS 配置
  return window.TcbCmsConfig[key] || defaultValue || InnerDefaultValue[key] || '';
};
