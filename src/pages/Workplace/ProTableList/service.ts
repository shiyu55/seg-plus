import { request } from 'sula';

export async function queryRule(params?: TableListParams) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params,
  });
}
export async function updateRule(params?: TableListParams) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params,
  });
}
export async function addRule(params?: TableListParams) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params,
  });
}
export async function removeRule(params: { recordId: string }) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params: {
      recordIds: params.recordId, // url和真实params不一样了,但是却能用
    },
    method: 'DELETE',
  });
}
