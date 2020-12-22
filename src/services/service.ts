import { request } from 'umi';

export const getAdminList = async () => {
  return request(
    'https://api.vika.cn/fusion/v1/datasheets/dstVa767nJuCh5p8Pk/records?viewId=viwPllrJ9Tp7J&fieldKey=name',
    {
      headers: {
        Authorization: 'Bearer uskiqeZCodh9YOuB5uuwjg7',
      },
    },
  );
};
