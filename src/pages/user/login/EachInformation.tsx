import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';
import type { ConnectProps, manageIndexModelState } from 'umi';
import { connect } from 'umi';
import { Button, Modal, Form, Input ,message} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';

const EachInformation: FC<PageProps1> = ({ manageindex, dispatch }) => {

    const { showEdit, current, isEdit,admin01fields } = manageindex;
 
 
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
          dataIndex: '姓名',
          editable: true,
       },
       {
          title: '起薪单位',
          dataIndex: '起薪单位',
       },
 
       {
          title: '在册单位',
          dataIndex: '在册单位',
       },
       {
          title: '现所在单位',
          dataIndex: '现所在单位',
       },
       {
          title: '修改',
          render: (row: any) => {
             return <>
                <Button type='primary' size='small' icon={<EditOutlined />} onClick={() => {
                   dispatch({
                      type: 'manageindex/save',
                      payload: {
                         showEdit: true,
                         isEdit: true,
                         current: row,
                      },
                   });
                }}
                />
             </>;
          },
       },
       {
          title: '删除',
          render: (row: any) => {
             return <>
                <Button type='primary' size='small' icon={<CloseSquareTwoTone  />} onClick={() => {
                   dispatch({
                      type: 'manageindex/admin01del',
                      payload: {
                         current: row,
                      }
                   });
                }}
                danger />
             </>;
          },
       },
    ];
    const [form] = Form.useForm();
    const onFinish = () => {
       form.validateFields().then((fields: any) => {
          if (isEdit) {
             dispatch({
                type: 'manageindex/admin01update',
                payload: {
                   
                   records: { fields },
                }
             });
          }
          else {
             dispatch({
                type: 'manageindex/admin01insert',
                payload: {
                   records: { fields },
                }
             });
          };
       });
    };
    const onCancel = () => {
       dispatch({
          type: 'manageindex/save',
          payload: {
             current: {},
             showEdit: false,
             isEdit: false,
          }
       });
    };
    
    // 当前选中值从新设置表单数据
    useEffect(() => {
       form.setFieldsValue(current);
    }, [current, form]);
    /* let b1={fields:[]};
    const admin01field = [];
    // eslint-disable-next-line no-restricted-syntax
    for (b1 of admin01fields) {
       admin01field.push(b1.fields);
    }
    */
    return (
       <div>
          <PageContainer>
             <Button type='primary' icon={<EditOutlined />} onClick={() => {
                message.info('This is a normal message');
                dispatch({
                   type: 'manageindex/save',
                   payload: {
                      showEdit: true,
                      isEdit: false,
                      current: {
                         recordIds:'',
                         姓名: '',
                         起薪单位: '',
                         在册单位: '',
                         现所在单位: '',
                      },
                   },
                });
             }}>
                新增
                </Button>
             <ProCard colSpan={24} bordered title='基础信息'>
             <ProTable columns={columns} dataSource={admin01fields}  rowKey='recordId' editable={true}/>
             </ProCard>
             <Modal
                getContainer={false} visible={showEdit} title="编辑" onOk={onFinish} onCancel={onCancel} width={1000}>
                <Form onFinish={onFinish} form={form}>
                   <Form.Item label="姓名" name="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
                      <Input placeholder="请输入姓名" />
                   </Form.Item>
                   <Form.Item label="起薪单位" name="起薪单位" rules={[{ required: true, message: "请输入起薪单位" }]}>
                      <Input placeholder="请输入起薪单位" />
                   </Form.Item>
                   <Form.Item label="在册单位" name="在册单位" rules={[{ required: true, message: "请输入在册单位" }]}>
                      <Input placeholder="请输入在册单位" />
                   </Form.Item>
                   <Form.Item label="现所在单位" name="现所在单位" rules={[{ required: true, message: "请输入现所在单位" }]}>
                      <Input placeholder="请输入现所在单位" />
                   </Form.Item>
                </Form>
             </Modal>;
          </PageContainer>
       </div>
    );
 };
 
 
 export default connect(({ manageindex }: { manageindex: manageIndexModelState }) => ({
 
    manageindex,
 }))(EachInformation);