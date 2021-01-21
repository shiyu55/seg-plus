import React, { useState } from 'react';
import { useModel, useRequest } from 'umi';
import { Button, Space, message, Form, Input, Menu, Upload } from 'antd';
import { updateUser } from '@/services/user';
import { UploadOutlined } from '@ant-design/icons';
import styles from './personal.less';
import { GridContent } from '@ant-design/pro-layout';
import ImgCrop from 'antd-img-crop';

export default ({
  onClose,
  onSuccess,

}: {

  onClose: () => void
  onSuccess: () => void
}) => {
  const { initialState } = useModel('@@initialState');
  console.log(initialState.currentUser._id);
  // 加载用户列表
  const { run, loading } = useRequest(
    async (data: any) => {
      const diffData = Object.keys(data);
      /*         .filter((key) => selectedUser[key] !== data[key])
              .reduce(
                (ret, key) => ({
                  ...ret,
                  [key]: data[key],
                }),
                {}
              ); */
      // eslint-disable-next-line no-underscore-dangle
      await updateUser(initialState.currentUser._id, diffData);

      onSuccess();
    },
    {
      manual: true,
      onError: () => message.error('更新用户失败'),
      onSuccess: () => message.success('更新用户成功'),
    }
  );
  const getAvatarURL = () => {
    if (initialState.currentUser) {
      if (initialState.currentUser.avatarUrl) {
        return initialState.currentUser.avatarUrl;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

    const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ]);
  
    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };
  
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };
  const AvatarView = ({ avatarUrl }: { avatarUrl: string }) => (
    <>
      <div className={styles.avatar_title}>
        头像
      </div>
      <div className={styles.avatar}>
     
        <img src={avatarUrl} alt="avatar" />
      </div>
      <ImgCrop rotate>
      <Upload showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
       fileList={fileList}
        onChange={onChange}
        onPreview={onPreview} 
        >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
           更新头像
          </Button>
        </div>
      </Upload>
      </ImgCrop>
    </>);

  return (
    <GridContent>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu  >
            Basic Settings
          </Menu>
        </div>
        

          <div className={styles.left}>
            <Form
              layout="vertical"
              /*  labelAlign="left"
               labelCol={{ span: 6 }} */
              hideRequiredMark
              initialValues={initialState.currentUser}
              onFinish={(v = {}) => {
                run(v);
              }}
            >
              <Form.Item
                label="用户名"
                name="username"

                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+[a-zA-Z0-9_-]?[a-zA-Z0-9]+$/g,
                    message: '用户名不符合规则',
                  },
                  {
                    required: true,
                    pattern: /\D+/g,
                    message: '用户名不能是纯数字',
                  },
                ]}
              >
                <Input placeholder="用户名，字母和数字的组合，不能为纯数字，长度范围是 1 ~ 32" disabled />
              </Form.Item>
              <Form.Item
                label="昵称"
                name="nickName"
              >
                <Input placeholder="请输入真实姓名" />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
              >
                <Input placeholder="请输入石化邮箱" />
              </Form.Item>
              <Form.Item
                label="用户密码"
                name="password"
                rules={[

                  {
                    pattern: /\D+/,
                    message: '密码不能由纯数字或字母组成',
                  },
                  {
                    pattern: /[^a-zA-Z]/,
                    message: '密码不能由纯数字或字母组成',
                  },
                ]}
              >
                <Input.Password
                  placeholder="密码长度必需大于 8 位，不能由纯数字或纯字母组成"


                />
              </Form.Item>
              <Form.Item>
                <Space size="large" style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button onClick={() => onClose()}>取消</Button>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    更新
                    </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
          <div className={styles.baseView}>
          <div className={styles.right}>
            <AvatarView avatarUrl={getAvatarURL()} />
          </div>
          </div>
      </div>

    </GridContent>



  );
};
