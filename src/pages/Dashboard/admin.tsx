import React from 'react';
import { Statistic, Col, Row, Card } from 'antd';
import { Link } from 'umi';
import { Chart, Tooltip, Interval } from 'bizcharts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const UserPage = () => {
  const data = [
    { name: '已审批', month: 'Jan.', value: 20 },
    { name: '已审批', month: 'Feb.', value: 28 },
    { name: '已审批', month: 'Mar.', value: 39 },
    { name: '已审批', month: 'Apr.', value: 81 },
    { name: '已审批', month: 'May', value: 47 },
    { name: '已审批', month: 'Jun.', value: 20 },
    { name: '已审批', month: 'Jul.', value: 24 },
    { name: '已审批', month: 'Aug.', value: 35 },
    { name: '未审批', month: 'Jan.', value: 12 },
    { name: '未审批', month: 'Feb.', value: 23 },
    { name: '未审批', month: 'Mar.', value: 34 },
    { name: '未审批', month: 'Apr.', value: 99 },
    { name: '未审批', month: 'May', value: 52 },
    { name: '未审批', month: 'Jun.', value: 35 },
    { name: '未审批', month: 'Jul.', value: 37 },
    { name: '未审批', month: 'Aug.', value: 42 },
    { name: '待审批', month: 'Jan.', value: 12 },
    { name: '待审批', month: 'Feb.', value: 23 },
    { name: '待审批', month: 'Mar.', value: 34 },
    { name: '待审批', month: 'Apr.', value: 99 },
    { name: '待审批', month: 'May', value: 52 },
    { name: '待审批', month: 'Jun.', value: 35 },
    { name: '待审批', month: 'Jul.', value: 37 },
    { name: '待审批', month: 'Aug.', value: 45 },
  ];

  return (
    <>
      <div className="site-statistic-demo-card">
        <Row gutter={8}>
          <Col {...topColResponsiveProps}>
            <Card title="项目人数">
              <Statistic prefix={5879} value="/" suffix={8000} />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card extra={<Link to="/details">details</Link>} title="机关人数">
              <Statistic prefix={790} value="/" suffix={8000} />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card extra={<Link to="/details">details</Link>} title="休假人数">
              <Statistic prefix={578} value="/" suffix={8000} />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card extra={<Link to="/details">details</Link>} title="外借人数">
              <Statistic prefix={799} value="/" suffix={8000} />
            </Card>
          </Col>
        </Row>
      </div>
      <Row>
        <Col xs={24} sm={12} md={24} lg={24} xl={24}>
          <Card title="人员动迁状态" extra={<Link to="/details">details</Link>}>
            <Chart height={400} padding="auto" data={data} autoFit>
              <Interval
                adjust={[
                  {
                    type: 'stack',
                  },
                ]}
                color="name"
                position="month*value"
              />
              <Tooltip shared />
            </Chart>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserPage;
