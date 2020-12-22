import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Badge, Avatar } from 'antd';
import { Map } from '@/components/Charts';
import styles from './Welcome.less';

const PageHeaderContent = () => (
  <div>
    <span className="avatar-item">
      <Badge count={100} overflowCount={999} style={{ backgroundColor: '#000' }} offset={[-10, 1]}>
        <Avatar
          style={{
            backgroundColor: '#000',
            verticalAlign: 'middle',
          }}
          size="large"
          gap={4}
        >
          {'总计'}
        </Avatar>
      </Badge>
    </span>
    <span className="avatar-item">
      <Badge count={60} style={{ backgroundColor: '#52c41a' }} offset={[-10, 1]}>
        <Avatar
          style={{
            backgroundColor: '#52c41a',
            verticalAlign: 'middle',
          }}
          size="large"
          gap={4}
        >
          {'受控'}
        </Avatar>
      </Badge>
    </span>
    <span className="avatar-item">
      <Badge count={30} style={{ backgroundColor: '#fa8c16' }} offset={[-10, 1]}>
        <Avatar
          style={{
            backgroundColor: '#fa8c16',
            verticalAlign: 'middle',
          }}
          size="large"
          gap={4}
        >
          {'偏差'}
        </Avatar>
      </Badge>
    </span>
    <span className="avatar-item">
      <Badge count={10} style={{ backgroundColor: '#f5222d' }} offset={[-10, 1]}>
        <Avatar
          style={{
            backgroundColor: '#f5222d',
            verticalAlign: 'middle',
          }}
          size="large"
          gap={4}
        >
          {'预警'}
        </Avatar>
      </Badge>
    </span>
  </div>
);

export default (): React.ReactNode => {
  return (
    <PageContainer title="项目实时运行偏差预警" extra={<PageHeaderContent />}>
      <div className={styles.mapChart}>
        <Map />
      </div>
    </PageContainer>
  );
};
