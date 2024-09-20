import { Col, Row } from "antd";
import "./Footer.scss";

const FooterComponent = () => {
  return (
    <div id="footer">
      <Row gutter={16}>
        <Col className="gutter-row footer-col" span={6}>
          <h3>LIÊN HỆ</h3>
          <ul>
            <li>Số 8 đường Phạm Hùng, Cầu Giấy, Hà Nội</li>
            <li>024.37684059</li>
            <li>bvdkyhcthn@hanoi.gov.vn</li>
            <li>http://bvdkyhoccotruyenhanoi.vn</li>
          </ul>
        </Col>
        <Col className="gutter-row footer-col" span={6}>
          <h3>GIỚI THIỆU </h3>
          <ul>
            <li>Cơ cấu tổ chức </li>
            <li>Đơn vị - Khoa phòng</li>
            <li>Tầm nhìn - Sứ mệnh</li>
          </ul>
        </Col>
        <Col className="gutter-row footer-col" span={6}>
          <h3>LIÊN KẾT ĐƠN VỊ</h3>
          <ul>
            <li> Bộ y tế </li>
            <li>Sở y tế Hà Nội</li>
            <li>Trường đại học y Hà Nội</li>
          </ul>
        </Col>
        <Col className="gutter-row footer-col" span={6}>
          <h3>GIỜ KHÁM BỆNH</h3>
          <ul>
            <li>
              <span>Thứ 2 - Thứ 7 :</span>
              <span>7h30 - 17h</span>
            </li>
            <li>
              <span>Chủ nhật</span>
              <span>Trực cấp cứu 24/24</span>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <div className="copyright">
          Copyright ©2016 BVTHCTHN. All Rights Reserved
        </div>
      </Row>
    </div>
  );
};

export default FooterComponent;
