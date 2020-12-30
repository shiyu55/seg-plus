import * as React from 'react';
import { MapboxScene, Marker } from '@antv/l7-react';
import { PageLoading } from '@ant-design/pro-layout';
// import styles from './style.less'
import './style.less'; // 这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件 babel-plugin-import 的 style 属性一起使用。
import 'animate.css';
import { Drawer, Divider, Col, Row } from 'antd';

type DescriptionItemProps = {
  title?: string;
  content?: unknown;
};
const DescriptionItem: React.FC<DescriptionItemProps> = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
export default class Map extends React.Component {
  state = {
    data: [],
    grid: null,
    loading: false,
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  public async componentDidMount() {
    const [geoData] = await Promise.all([
      fetch(
        // 'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
        // 'https://lg-6afqgacs-1251417203.cos.ap-shanghai.myqcloud.com/geoData.json',
        'https://gw.alipayobjects.com/os/basement_prod/67f47049-8787-45fc-acfe-e19924afe032.json',
      ).then((d) => d.json()),
    ]);
    this.setState({
      data: geoData,
      loading: true,
    });
  }

  public render() {
    const { data, loading } = this.state;

    function getColor(v: number) {
      // eslint-disable-next-line no-nested-ternary
      return v > 25 ? '#f5222d' : v > 19 ? '#fa8c16' : '#52c41a';
    }
    return loading === false ? (
      <PageLoading />
    ) : (
      <>
        <MapboxScene
          option={{
            logoVisible: false,
          }}
          map={{
            center: [105.790327, 36.495636],
            pitch: 0,
            style: 'dark', // dark|light|normal|blank
            zoom: 4,
            // autoFit:true
          }}
          style={{
            position: 'relative',
            width: '100%',
            height: '652px',
          }}
          /*           style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }} */
        >
          {data &&
            data.map((item: any) => {
              // eslint-disable-next-line no-nested-ternary
              return item.g !== '1' || item.v === '' ? null : item.v > 25 ? (
                <Marker key={item.n} lnglat={[item.x * 1, item.y]}>
                  <div
                    className="radius"
                    style={{
                      background: getColor(item.v),
                    }}
                  >
                    <p
                      className="animate_radius"
                      style={{
                        background: getColor(item.v),
                      }}
                    >
                      <a onClick={this.showDrawer}>{`${item.v / 10 + 3}%`}</a>
                    </p>
                  </div>
                </Marker>
              ) : (
                <Marker key={item.n} lnglat={[item.x * 1, item.y]}>
                  <div
                    className="radius"
                    style={{
                      background: getColor(item.v),
                    }}
                  >
                    <p
                      className="animate_radius2"
                      style={{
                        background: getColor(item.v),
                      }}
                    >
                      <a>{`${item.v / 10}%`}</a>
                    </p>
                  </div>
                </Marker>
              );
            })}
        </MapboxScene>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            项目概况
          </p>
          <p className="site-description-item-profile-p">地理位置</p>
          <Row>
            <Col span={24}>沙特哈拉德天然气项目由三个PACKAGE 共17个装置组成。</Col>
            <Col span={24}>
              <img src="../../Picture1.png" width="100%" />
            </Col>
          </Row>

          <Divider />
          <p className="site-description-item-profile-p">合同内容</p>
          <Row>
            <Col span={24}>
              <DescriptionItem title="项目名称" content="哈拉德天然气项目" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="业主" content="沙特阿美" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="EPC总承包" content="TR" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="合同金额（万美元）" content="9549" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="合同支付币种" content="沙特里亚尔" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="合同范围"
                content="2个GCP、4个LSS装置机械电仪安装施工及4个LSS土建、建筑物安装施工"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="合同工期" content="2020-01-01 -----2021-04-30 " />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="合同付款周期"
                content="15日内批复付款证书，接收发票后60日内付款"
              />
            </Col>
          </Row>

          <Divider />
          <p className="site-description-item-profile-p">Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="项目经理Email" content="****@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="项目经理Phone" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="项目驾驶舱"
                content={[<a href="./admin">综合部</a>, '   ', <a href="./admin">经营部</a>]}
              />
            </Col>
          </Row>
        </Drawer>
      </>
    );
  }
}
