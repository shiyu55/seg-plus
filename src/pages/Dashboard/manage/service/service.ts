import request from '@/utils/request';
// 加载数据
export function loaddatelist() {
  return request('/api/v3/views/executesql', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9jcmVhdGVfdGltZSI6MTYwODI1NTYyMzcyNiwic3ViIjoiZ3Vlc3QiLCJ0b2tlbl91c2VyX25hbWUiOiJndWVzdCIsImV4cCI6MTYwODI1NzQyMywidG9rZW5fdXNlcl9wYXNzd29yZCI6IiQyYSQxMCRSSktiNGpoTWdSWW5HUGxWUlYwMzZlcnhRM29HWjhObnhacmxyckJKSmhhOTM3NmNBdVRSTyJ9.d182RWXxIjDeE5eGEmBsZZAMa8tmhtOp5xSW5Ae6SJDf0500BJ9k-7_i54WQf1sJPDnNAKS4SmwrwVG28-Qnlw',
    },

    method: 'post',
    data: {
      sourceId: 2,
      sql:
        "select 'Total' AS `Unit`,`填写日期`.`日期` AS `日期`,round(sum(`PCS台账`.`Weight`),2) AS `Weight`,`PCS台账`.`Activity_Sheet` AS `Discipline`,round((sum((`PCS台账`.`Weight` * `PCS台账`.`Actual_Progress2`)) / sum(`PCS台账`.`Weight`)),2) AS `Actual`,`日期匹配`.`每周日期` AS `每周日期` from ((`日期匹配` join `填写日期` on((`日期匹配`.`日期` = `填写日期`.`日期`))) join `PCS台账` on((`PCS台账`.`Date` = `日期匹配`.`每周日期`))) where (`填写日期`.`日期` = `日期匹配`.`日期`) group by `填写日期`.`日期`,`日期匹配`.`每周日期`,`PCS台账`.`Activity_Sheet`,'Total' ",
      limit: 500,
      variables: [],
    },
  });
}
// 加载数据manageindex
export function Schedulelist() {
  return request(
    '/fusion/v1/datasheets/dstFdCwHCD5h8Z6m3t/records?viewId=viwPeQtqYxehp&fieldKey=name',
    {
      headers: { Authorization: 'Bearer uskBp5457QfWAcfdeP47rDu' ,
                                'Content-Type': 'application/json'
    },
      params: { pageNum: 1, pageSize: 1000 },
    },
  );
}
// 加载数据steelstructureSummary
export function steelstructureSummary() {
  return request(
    '/fusion/v1/datasheets/dstT5XgbYDqeiWeSwe/records?viewId=viwcBGA715Scg&fieldKey=name',
    {
      headers: { Authorization: 'Bearer uskBp5457QfWAcfdeP47rDu' ,
                                'Content-Type': 'application/json'
    },
      params: { pageNum: 1, pageSize: 1000 },
    },
  );
}


// 人力资源汇总
export function Pei() {
  return request(
    '/fusion/v1/datasheets/dst0Q5p65GHdtV8WmF/records?viewId=viwK22QbkzTVt&fieldKey=name',
    {
      headers: { Authorization: 'Bearer uskBp5457QfWAcfdeP47rDu' },
    
    },
  );
}
// 人力资源详情
export function Pei2() {
  return request(
    '/fusion/v1/datasheets/dstWrjkpR4RDg6wDr7/records?viewId=viwpjJCGoQfGP&fieldKey=name',
    {
      headers: { Authorization: 'Bearer uskBp5457QfWAcfdeP47rDu',
                                'Content-Type': 'application/json' },
      params: { pageNum: 1, pageSize: 1000 }
    },
  );
}
// 加载数据
export function admin01loaddatelist() {
  return request(
    '/fusion/v1/datasheets/dst5YsSyptgdhMEBmk/records?viewId=viwFkqj2F08rm&fieldKey=name',
    {
      headers: { Authorization: 'Bearer uskBp5457QfWAcfdeP47rDu',
                                'Content-Type': 'application/json', },
      params: { pageNum: 1, pageSize: 1000 },
      },
  
  );
}


// 新增数据
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-shadow
export function admin01saveOne(records: any) {
  
  return request('/fusion/v1/datasheets/dst5YsSyptgdhMEBmk/records?viewId=viwFkqj2F08rm&fieldKey=name', {
    headers: { 'Authorization': 'Bearer uskBp5457QfWAcfdeP47rDu' ,'Content-Type': 'application/json'},
   
  method: 'POST',
  
    data:`{"records":[${JSON.stringify(records.records)}],"fieldKey": "name"}`

    ,
  });
 
}
// 修改数据
export function admin01updateOne(recordId: any, records: any) {
  
  return request('/fusion/v1/datasheets/dst5YsSyptgdhMEBmk/records?viewId=viwFkqj2F08rm&fieldKey=name', {
    headers: { Authorization: 'Bearer uskBp5457QfWAcfdeP47rDu' },
    method: 'PATCH',
    data:`{"records":[${JSON.stringify(recordId)}],[${JSON.stringify(records.records)}],"fieldKey": "name"}`,
    
  });
}
// 删除数据
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function admin01delOne(recordId: any) {
  
  return request('/fusion/v1/datasheets/dst5YsSyptgdhMEBmk/records?', {
    headers: { Authorization: 'Bearer uskBp5457QfWAcfdeP47rDu' },
    method: 'DELETE',
    params:{
      recordIds:recordId,}
  });
}
