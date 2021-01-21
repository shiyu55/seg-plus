import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';
import type { ConnectProps, manageIndexModelState } from 'umi';
import { connect } from 'umi';
import { Button, Modal, Form, Input, message, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { CloseSquareTwoTone, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';

type PageProps = {
    manageindex: manageIndexModelState;
    loading: boolean;
    dispatch: any;
    payload: any;
    d: any;
} & ConnectProps;

const SteelStructurePage: FC<PageProps> = ({ manageindex, dispatch }) => {

    const { showEdit, current, isEdit, steelstructureSummaryfields } = manageindex;
    const d = new Date();
    const d1=d.getDay();
    const columns: ColumnsType<object> = [
        {
            title: 'SN',
            render: (row: any, key: any, table: number) => <span>{table + 1}</span>,
            width: 80,
            align: 'center',
            fixed: 'left',
        },
        /* {
           title: 'recordId',
           dataIndex: 'recordId',
        }, */
        {
            title: 'Items',
            dataIndex: 'Items',
            editable: true,
            fixed: 'left',
        },
        {
            title: 'BOQ',
            dataIndex: 'BOQ',
            fixed: 'left',
        },

        {
            title: 'Material Delivery',
            dataIndex: 'Material Delivery',
            fixed: 'left',
        },
        {
            title: 'Available',
            dataIndex: 'Available',
            fixed: 'left',
        },
        {
            title: 'Erected',
            dataIndex: 'Erected',
            fixed: 'left',
        },
        {
            title: 'Erectable',
            dataIndex: 'Erectable',
            fixed: 'left',
        },
        {
            title: 'Next week plan',
            dataIndex: 'Next week plan',
            fixed: 'left',
        },
        {
            title: 'Daily Completed Record',
            children: [
                {
                    title: 'Saturday',
                    key: 1,
                    children: [
                        {
                            title: d1,
                            children: [
                                {
                                    title: 'Porcution',
                                    dataIndex: 'Porcution',
                                },
                                {
                                    title: 'Manpower',
                                    dataIndex: 'Manpower',
                                },
                                {
                                    title: 'Equipment',
                                    dataIndex: 'Equipment',
                                }
                            ]
                        }]
                },
                {
                    title: 'Sunday',
                    key: 2,
                    children: [
                        {
                            title: 'd',
                            children: [
                                {
                                    title: 'Porcution',
                                    dataIndex: 'Porcution',
                                },
                                {
                                    title: 'Manpower',
                                    dataIndex: 'Manpower',
                                },
                                {
                                    title: 'Equipment',
                                    dataIndex: 'Equipment',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Monday',
                    key: 3,
                    children: [
                        {
                            title: 'd',
                            children: [
                                {
                                    title: 'Porcution',
                                    dataIndex: 'Porcution',
                                },
                                {
                                    title: 'Manpower',
                                    dataIndex: 'Manpower',
                                },
                                {
                                    title: 'Equipment',
                                    dataIndex: 'Equipment',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Tuesday',
                    key: 4,
                    children: [
                        {
                            title: 'd',
                            children: [
                                {
                                    title: 'Porcution',
                                    dataIndex: 'Porcution',
                                },
                                {
                                    title: 'Manpower',
                                    dataIndex: 'Manpower',
                                },
                                {
                                    title: 'Equipment',
                                    dataIndex: 'Equipment',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Wednesday',
                    key: 5,
                    children: [
                        {
                            title: 'd',
                            children: [
                                {
                                    title: 'Porcution',
                                    dataIndex: 'Porcution',
                                },
                                {
                                    title: 'Manpower',
                                    dataIndex: 'Manpower',
                                },
                                {
                                    title: 'Equipment',
                                    dataIndex: 'Equipment',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Thursday',
                    key: 6,
                    children: [
                        {
                            title: 'd',
                            children: [
                                {
                                    title: 'Porcution',
                                    dataIndex: 'Porcution',
                                },
                                {
                                    title: 'Manpower',
                                    dataIndex: 'Manpower',
                                },
                                {
                                    title: 'Equipment',
                                    dataIndex: 'Equipment',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Friday',
                    key: 7,
                    children: [
                        {
                            title: 'd',
                            children: [
                                {
                                    title: 'Porcution',
                                    dataIndex: 'Porcution',
                                },
                                {
                                    title: 'Manpower',
                                    dataIndex: 'Manpower',
                                },
                                {
                                    title: 'Equipment',
                                    dataIndex: 'Equipment',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Weekly Total',
                    children: [
                        {
                            title: 'Porcution',
                            dataIndex: 'Porcution',
                        },
                        {
                            title: 'Manpower',
                            dataIndex: 'Manpower',
                        },
                        {
                            title: 'Equipment',
                            dataIndex: 'Equipment',
                        }

                    ],
                    fixed: 'right',
                },
            ],

        },

    ];
    const [form] = Form.useForm();
    console.log(form);
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
                                recordIds: '',
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
                    <Table columns={columns} dataSource={steelstructureSummaryfields} rowKey='recordId' editable={true} bordered size="small" />
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
}))(SteelStructurePage);
