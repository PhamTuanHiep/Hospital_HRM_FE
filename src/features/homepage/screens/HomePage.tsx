import { Card, Carousel, Col, Flex, Row, Statistic } from "antd";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <>
      <Flex id="homepage" vertical>
        <Carousel
          className="home-carousel"
          arrows={true}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={2000}
        >
          <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/homepage%2Fslide1.jpg?alt=media&token=4b6c8d23-9760-4e94-89f0-bacdfdc482e4" />
          </div>
          <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/homepage%2Fslide2.jpg?alt=media&token=d26d9cae-acf7-4717-af7e-43e9adb6e794" />
          </div>
        </Carousel>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={true}>
              <Statistic
                title="So luong bac si"
                value={70}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="So luong giuong benh"
                value={300}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>
      </Flex>
    </>
  );
};

export default HomePage;
