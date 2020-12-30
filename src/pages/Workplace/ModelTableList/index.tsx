import { Table } from 'antd';
import React from 'react';
import type { ModelTableListState, ConnectRC, Loading } from 'umi';
import { connect } from 'umi';

type PageProps = {
  index: ModelTableListState;
  loading: boolean;
};

const TableList: ConnectRC<PageProps> = ({ index }) => {
  // extends Component<Props>

  const { list } = index;

  const edit = () => {};

  const Columns = [
    {
      dataIndex: '编码',
      title: '编码',
    },
    {
      dataIndex: '姓名',
      title: '姓名',
    },
    {
      dataIndex: '起薪单位',
      title: '起薪单位',
    },
    {
      dataIndex: '在册单位',
      title: '在册单位',
    },
    {
      dataIndex: '现所在单位',
      title: '现所在单位',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: () => {
        return <a onClick={() => edit()}>Edit </a>;
      },
    },
  ];

  return <Table columns={Columns} dataSource={list} />;
};
export default connect(({ index, loading }: { index: ModelTableListState; loading: Loading }) => ({
  index,
  loading: loading.models.index,
}))(TableList);
