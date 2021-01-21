import type { FC } from 'react';
import React from 'react';
import {  useModel } from 'umi';
import GridContent from '@ant-design/pro-layout';
import { Menu, Button, Input, Upload, Form, message } from 'antd';
// import BindingView from './components/binding';
import type { CurrentUser, UserModelState, UserModelType } from '@/models/user';
// import NotificationView from './components/notification';
// import SecurityView from './components/security';
import styles from './personal.less';
import { UploadOutlined } from '@ant-design/icons';
import {  getCloudBaseApp } from '@/utils';
import { updateUser } from '@/services/user';

type personalProps = {
  dispatch: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  currentUser: UserModelState;
  user: UserModelType;
  payload: any;
};
/* {
let app;
let loginState;

try {
  app = await getCloudBaseApp();
  // 获取登录态
  loginState = await app
    .auth({
      persistence: 'local',
    })
    .getLoginState();
} catch (error) {
 
  message.error(`CloudBase JS SDK 初始化失败，${error?.message}`);
}}; */
//
const Personal: FC<personalProps> = ({dispatch}) => {
  
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const onFinish = (fields: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    updateUser(initialState.currentUser._id,fields);
    console.log(initialState.currentUser._id,fields);
    /* form.validateFields().then((from: any,avatar: any) => {
      dispatch({
        type: 'updateUser',
        payload: {
           
           records: { from,avatar },
        }
     });


    }); */
  };
 
  const getAvatarURL = () => {
    if (initialState.currentUser) {
      if (initialState.currentUser.avatar) {
        return initialState.currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };
  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>
        头像
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
           更新头像
          </Button>
        </div>
      </Upload>
    </>);


  return (
    <GridContent>
             <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu >
          Basic Settings
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.baseView}> 
      <div className={styles.left}>
        <Form
          layout="vertical"
          // onFinish={onFinish}
          initialValues={initialState.currentUser}
          hideRequiredMark
          form={form}
        >
          <Form.Item
            name="username"
            label='用户名'
            rules={[
              {required: true,},]}>
          <Input disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label='邮箱'
            rules={[
              {
                required: true,
                message: '请输入邮箱'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nickName"
            label='昵称'
            rules={[
              {
                required: true,
                message: '请输入昵称'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" onClick={onFinish}>
              更新信息
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </div>
        </div>
      </div> 
    </GridContent>
  );
};


export default Personal;