
import React from 'react';
import type { ConnectProps,manageIndexModelState } from 'umi';
import { connect } from 'umi';
import { Row,Col, Table } from 'antd';
import { Chart, Tooltip, Line, Legend } from 'bizcharts';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import Page from './Charts';


type PageProps1 = {
   manageindex: manageIndexModelState;
   loading: boolean;
   
} & ConnectProps;
const columns = [
   {
      title: '专业',
      dataIndex: '专业',
   },
   {
      title: '日期',
      dataIndex: '日期',
   },

   {
      title: '完成',
      dataIndex: '完成百分比',
   },
];

const IndexPage: React.FC<PageProps1> = ({ manageindex }) => {
   const { managefields } = manageindex;
/*    let b1 = { fields: [] };
  
   const managefield = [];
   // eslint-disable-next-line no-restricted-syntax
   for (b1 of managefields1) {
      managefield.push(b1.fields);
   } */
   // eslint-disable-next-line no-restricted-syntax
  console.log(managefields);
   const scale = {
      完成百分比: { min: 0, max: 100 },
   };

   return (
      <div>
         <PageContainer>
           
         <ProCard style={{ marginTop: 8 }} gutter={16}>
            <ProCard colSpan={8} layout="center" bordered title="项目进度曲线 Progress S-Curve" >
            
            <Chart scale={scale} padding={[30, 20, 50, 40]} autoFit height={320} data={managefields}>
               <Line
                  shape="smooth"
                  position="日期*完成百分比"
                  color={[
                     '计划类型',
                     (xVals1) => {
                        if (xVals1 === 'Baslin') {
                           return '#cf1322';
                        }
                        if (xVals1 === 'Re-Baslin') {
                           return '#ffec3d';
                        }
                        return '#5b8c00';
                     },
                  ]}
               /* label="完成百分比"  */
               />
               <Tooltip shared showCrosshairs />
               <Legend position="top-left" />
            </Chart>
            </ProCard>
            <ProCard colSpan={8} layout="center" bordered title='人力资源状态 Manpower Status'>
            <Page />
            </ProCard>
            <ProCard colSpan={8} layout="center" bordered title='人员信息 Staff Information'>
               直接间接
            </ProCard>
            </ProCard>
            <Row>
               <Col span={8}>
            <Table columns={columns} dataSource={managefields}></Table>
            </Col>
            </Row>
         </PageContainer>
      </div>
   );
};

export default connect(({ manageindex }: { manageindex: manageIndexModelState }) => ({
   manageindex,
}))(IndexPage);
