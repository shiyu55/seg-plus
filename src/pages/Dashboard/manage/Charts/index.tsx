import React, { useEffect, useRef, useState } from 'react';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import { Modal, Table } from 'antd';
import type { ConnectProps, manageIndexModelState } from 'umi';
import { connect } from 'umi';
import type { ColumnsType } from 'antd/lib/table';


type PageProps1 = {
  manageindex: manageIndexModelState;
  loading: boolean;
  dispatch: any;
  payload: any;
  NowCompany: any;
  data3: [];
} & ConnectProps;

const Page: React.FC<PageProps1> = ({ manageindex }) => {
  const { adminListfields, adminTotlefields } = manageindex;
  

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [Shape, setShape] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  /* const data1=admin03fields.filter((admin03fields.分类=shape)); */
  const showModal = (shape: any) => {
    setIsModalVisible(true);
    setShape(shape);

  };

  let data3: [ any];
  // eslint-disable-next-line default-case
  switch (Shape) {
    case '机关': data3 = '国际业务部';
      break;
    case '科威特项目部': data3 = '科威特项目部';
      break;
      // eslint-disable-next-line no-duplicate-case
      case '沙特哈拉德天然气项目部': data3 = '沙特哈拉德天然气项目部';
      break;
      // eslint-disable-next-line no-duplicate-case
      case '沙特朱拜尔EOEG项目': data3 = '沙特朱拜尔EOEG项目';
      break;
      // eslint-disable-next-line no-duplicate-case
      case '马来西亚项目': data3 = '马来西亚项目';
      break;

  };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const data2 = adminListfields.filter(item => item.NowCompany === data3 );
  
  const handleOk = () => {
    setIsModalVisible(false);
  };
// 111
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  // eslint-disable-next-line @typescript-eslint/ban-types
  const columns: ColumnsType<object> = [
    {
      title: '序号',
      render: (row: any, key: any, table: number) => <span>{table + 1}</span>,
      width: 80,
      align: 'center',
    },
    /* {
       title: 'recordId',
       dataIndex: 'recordId',
    }, */
    {
      title: '姓名',
      dataIndex: 'Name',
  
    },
    {
      title: '起薪单位',
      dataIndex: 'PaymentCompany',
    },

    {
      title: '在册单位',
      dataIndex: 'RegisteredCompany',
    },
    {
      title: '现所在单位',
      dataIndex: 'NowCompany',
    },
  ];
  const originalRef = useRef(null);
  useEffect(() => {


    const dv = new DataSet.DataView().source(adminTotlefields);
    dv.transform({
      type: 'percent',
      field: '红海', // 统计销量
      dimension: 'year', // 每年的占比

      as: 'percent', // 结果存储在 percent 字段

    });


    // eslint-disable-next-line no-console

    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: originalRef.current, // 指定图表容器 ID
      width: 400, // 指定图表宽度
      height: 300, // 指定图表高度


    });

    // 指定饼图的内径
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.5,
    });
    // Step 2: 载入数据源
    chart.data(adminTotlefields);

    // 圆中心数据

    chart.annotation()
      .text({
        position: ['50%', '50%'],
        content: `总计：${dv.rows[0].红海}`,
        style: {
          fontSize: 16,
          fill: '#8c8c8c',
          textAlign: 'center',

        },
        /*    offsetY: -120,
           offsetX: 120, */
      });

    // 图例情况
    chart.legend({
      position: 'top-center', // 设置图例的显示位置
      autoWrap: 'ture',// 设置图例显示换行
    });
    // 触控情况
    chart.interaction('element-highlight', {
      start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
      end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
    });
    // Step 3: 创建图形语法，绘制饼状图
    // eslint-disable-next-line no-useless-concat
    chart.interval().adjust('stack').position('红海').color('分类').tooltip('红海*分类').label('红海', {
      offset: -30,
      style: {
        textAlign: 'center',
        fontSize: 16,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },

    }
    );

    // 点击事件
    chart.on('element:click', (ev: any) => {
      const shape = ev.data.data.分类;

      // const data1 = element.getModel().data;
      showModal(shape);

    });

    /* () => {

     history.push('../Dashboard/manage/table') */




    chart.render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);// 不知道为什么重复出现


  return (
    <div id="c1" ref={originalRef}>
      <Modal
        getContainer={false} visible={isModalVisible} title="编辑" onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Table columns={columns} dataSource={data2} />

      </Modal>
    </div>

  );

};
export default connect(({ manageindex }: { manageindex: manageIndexModelState }) => ({
  manageindex,
}))(Page);