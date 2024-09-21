import { Card, Carousel, Col, Flex, Row, Statistic } from "antd";

import "./HomePage.scss";
import { useAppSelector } from "../../../app/hooks";
import { useSelector } from "react-redux";

const HomePage = () => {
  const currentAccout = useAppSelector((state) => state.account_user);
  console.log("currentAccout:", currentAccout);

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
            <img src="https://wallpapers.com/images/high/beautiful-husky-dog-with-tongue-out-uu6gzwkw0uytavi0.webp" />
          </div>
          <div>
            <img src="https://wallpapers.com/images/hd/sweet-labrador-puppies-bhb8xtbnldjje5fa.webp"></img>
          </div>

          <div>
            <img src="https://wallpapers.com/images/high/corgi-on-blue-lake-view-p78670a3jnjqd2kz.webp" />
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
