import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic } from 'antd';
import { FormattedMessage } from 'umi';
import { Map } from '@/components/Charts';
import styles from './Welcome.less';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Row>
          <Col md={6} sm={12} xs={24}>
            <Statistic
              title={
                <FormattedMessage
                  id="dashboardandmonitor.monitor.sales-target"
                  defaultMessage="Sales target completion rate"
                />
              }
              value="92%"
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <Statistic
              title={
                <FormattedMessage
                  id="dashboardandmonitor.monitor.sales-target"
                  defaultMessage="Sales target completion rate"
                />
              }
              value="92%"
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <Statistic
              title={
                <FormattedMessage
                  id="dashboardandmonitor.monitor.sales-target"
                  defaultMessage="Sales target completion rate"
                />
              }
              value="92%"
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <Statistic
              title={
                <FormattedMessage
                  id="dashboardandmonitor.monitor.sales-target"
                  defaultMessage="Sales target completion rate"
                />
              }
              value="92%"
            />
          </Col>
        </Row>
        <div className={styles.mapChart}>
          <Map />
        </div>
      </Card>
    </PageContainer>
  );
};
