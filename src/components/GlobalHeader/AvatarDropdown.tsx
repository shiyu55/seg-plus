import { history, useModel,useAccess,connect } from 'umi';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, message } from 'antd';
import React, { useCallback }from 'react';
import type { ConnectProps } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { getCloudBaseApp, getPageQuery, logout } from '@/utils';
import { stringify } from 'querystring';

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
  menu?: boolean;
} & Partial<ConnectProps>;

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const app: any = await getCloudBaseApp();

  console.log(app);

  // 退出登录
  await logout();

  message.success('退出登录成功！');

  const { redirect } = getPageQuery();
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () =>  {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { isAdmin } = useAccess();

  const onMenuClick = useCallback((event: any) => {
    const { key } = event;

    if (key === 'logout') {
      setInitialState({ ...initialState, currentUser: {} });
      loginOut();
      return;
    }

    history.push(`/${key}`);
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  // eslint-disable-next-line no-underscore-dangle
  if (!currentUser?.username && !currentUser?._id) {
    return loading;
  }


    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {isAdmin && (
          <Menu.Item key="settings">
            <SettingOutlined />
            系统设置
          </Menu.Item>
        )}
  
        <Menu.Item key="personal">
                  <UserOutlined />
                  个人设置
              </Menu.Item>
  
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.username ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
         {/*  <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
          <span className={`${styles.name} anticon`}>{currentUser.username}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );

};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
