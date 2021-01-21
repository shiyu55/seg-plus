import React from 'react';
import { run } from 'concent';
import { notification, message, Typography } from 'antd';
import type { Context, ResponseError } from 'umi-request';
import type { RequestConfig } from 'umi';
import { history } from 'umi';
import { codeMessage } from './utils/constants';
import type { BasicLayoutProps, Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-layout';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';
import { getAuthHeaderAsync, getCloudBaseApp, isDevEnv } from './utils';
import * as models from './models';

run(models);

export async function getInitialState(): Promise<{
  currentUser?: Partial<API.CurrentUser>;
  settings?: LayoutSettings;
  menu?: any[];
  SERVER_MODE: any;
}> {
  let app;
  let loginState;

  try {
    app = await getCloudBaseApp();
    // 获取登录态
    loginState = await app
      .auth({
        persistence: 'local',
      })
      .getLoginState();
  } catch (error) {
   
    message.error(`CloudBase JS SDK 初始化失败，${error?.message}`);
  }

  // 没有登录，重新登录
  if (!isDevEnv() && !loginState) {
    history.push('/user/login');
    // 移除 loading 元素
    document.getElementById('loading')?.remove();
    return {};
  }

  let initialState: {
    menu?: MenuDataItem[];
    currentUser?: Partial<API.CurrentUser>;
    settings?: LayoutSettings;
  } = {};
  let currentUser = {} as any;

  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    try {
      currentUser = await queryCurrent();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  } else {
    try {
      currentUser = await queryCurrent();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  initialState = {
    currentUser,
  // eslint-disable-next-line no-underscore-dangle
    settings: defaultSettings,
  };

  // 已经登录成功，响应低码平台
  // eslint-disable-next-line no-underscore-dangle
  if (currentUser?._id && window.parent !== window.self) {
    window.parent.postMessage(
      JSON.stringify({
        from: 'cms',
        status: 'success',
      }),
      '*'
    );
  }

  // 移除 loading 元素
  document.getElementById('loading')?.remove();

  return initialState;
}

// 简单配置
export const layout = ({
  initialState = {},
}: {
  initialState: { menu?: MenuDataItem[]; settings?: LayoutSettings; currentUser?: API.CurrentUser }
}): BasicLayoutProps => {
  const { currentUser } = initialState;

  return {
    pure: true,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      // eslint-disable-next-line no-underscore-dangle
      if (!currentUser?._id && history.location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
  };
};

/**
 * 请求异常处理
 */
const errorHandler = async (error: ResponseError) => {
  const { response, data } = error;

  if (response?.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const data = await response.clone().json();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const message = data?.error?.message || data?.error?.code;

    notification.error({
      message: `请求错误 ${status}`,
      description: (
        <>
          <Typography.Text>{`${errorText} ${message || ''}`}</Typography.Text>
          <Typography.Text copyable>请求 URL：{url}</Typography.Text>
        </>
      ),
    });
  }

  if (data?.error) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const message = data?.error?.message || data?.error?.code;

    notification.error({
      message: data.error.code,
      description: <Typography.Text>{`${message}`}</Typography.Text>,
    });
  }

  if (!response?.status && !data?.error) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  throw error;
};

/**
 * 全局 request 配置
 */
export const request: RequestConfig = {
  middlewares: [
    async (ctx: Context, next: () => void) => {
      // 以 SERVER_MODE 运行时，添加 auth header
      // 获取通知时，不需要 auth header
      // eslint-disable-next-line @typescript-eslint/no-shadow
      if ((SERVER_MODE || isDevEnv()) && !ctx.req.url.includes('tcli.service')) {
        const res = await getAuthHeaderAsync();
        const { options } = ctx.req;
        ctx.req.options = {
          ...options,
          headers: {
            ...options?.headers,
            'Authorization': 'Bearer uskGPzhgQGZI4Vm75JAf3yA',
            'x-cloudbase-credentials': res['x-cloudbase-credentials'],
          },
        };
      }
      await next();
    },
  ],
  errorHandler,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: !resData?.error,
        errorMessage: resData?.error?.message,
      };
    },
  },
  // eslint-disable-next-line no-nested-ternary
  prefix: isDevEnv()
    ? defaultSettings.globalPrefix
    : SERVER_MODE
    ? `https://${window.TcbCmsConfig.containerAccessPath}${defaultSettings.globalPrefix}`
    : `https://${window.TcbCmsConfig.cloudAccessPath}${defaultSettings.globalPrefix}`,
};
