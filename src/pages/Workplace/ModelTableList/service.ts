import { request } from 'umi';

export async function query() {
  return request(
    'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    {
      headers: { Authorization: 'Bearer uskGPzhgQGZI4Vm75JAf3yA' },
    },
  );
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data }>('/api/notices');
}
