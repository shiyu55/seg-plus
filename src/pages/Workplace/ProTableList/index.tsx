import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListParams, TableListItem } from './data.d';
// import request from '@/utils/request';
import { request } from 'sula';

async function myQuery(params?: TableListParams) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params,
  });
}
async function updateRule(params?: TableListParams) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params,
  });
}
async function addRule(params?: TableListParams) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params,
  });
}
async function removeRule(params?: TableListParams) {
  return request({
    url:
      'https://api.vika.cn/fusion/v1/datasheets/dstJ2nlzK36HxsJnGc/records?viewId=viwZB4khCnl4P&fieldKey=name',
    params,
  });
}
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * 新建窗口的弹窗
   */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * 分布更新窗口的弹窗
   */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  /**
   * 国际化配置
   */
  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
      title: '序号',
    },
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
      dataIndex: 'operator',
      title: '操作',
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          // console.log(params, sorter, filter);
          const msg = await myQuery({
            pageNum: params.current,
            pageSize: params.pageSize,
            sorter,
            filter,
          });
          // console.log(msg);
          // return Promise.resolve({ // 需要研究https://www.jianshu.com/p/3c00970841c5
          return {
            data: msg.records.map((item: any, index: any) => {
              return {
                ...item,
                id: index + 1,
                recordId: item.recordId,
                编码: item.fields.编码,
                姓名: item.fields.姓名,
                起薪单位: item.fields.起薪单位,
                在册单位: item.fields.在册单位,
                现所在单位: item.fields.现所在单位,
              };
            }),
            success: true,
            total: msg.total,
          };
        }}
        // postData= {(data: any[]) => any[]}

        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="规则名称为必填项"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
