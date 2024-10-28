import { Card, Flex, Image, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const OrganizationScreen = () => {
  return (
    <Flex vertical gap={12}>
      <Card title="Sơ đồ tổ chức Bệnh viện">
        <Image.PreviewGroup>
          <Flex vertical align="center">
            <Image
              width={800}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/organization%2FS%C6%A1%20%C4%91%E1%BB%93%20t%E1%BB%95%20ch%E1%BB%A9c%20B%E1%BB%87nh%20vi%E1%BB%87n.jpg?alt=media&token=aa58f08f-d0ec-4aae-9d3c-1ee288996f59"
            ></Image>

            <Text>Sơ đồ tổ chức Bệnh viện</Text>
          </Flex>
        </Image.PreviewGroup>
      </Card>
      <Card title="Cơ cấu tổ chức và nhân lực">
        <Typography>
          <Title level={4} style={{ textAlign: "left" }}>
            I. Cơ cấu tổ chức và nhân lực
          </Title>
          <Paragraph style={{ textAlign: "left" }}>
            <Text strong style={{ textAlign: "left" }}>
              1. Cơ cấu tổ chức
            </Text>
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Hiện nay, Bệnh viện đa khoa y học cổ truyền Hà Nội có 320 giường
            bệnh, 303 cán bộ công nhân viên, có 22 khoa phòng và 4 Tổ công tác
            bao gồm:
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            12 khoa lâm sàng: Phòng khám đa khoa, Hồi sức chống độc, Lão, Nhi,
            Châm cứu, Phục hồi chức năng, Ngũ quan, Nội tổng hợp, Sản, Ngoại,
            Phòng mổ, Dinh dưỡng, Phòng khám A
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            4 khoa cận lâm sàng: Khoa Xét nghiệm, Dược, Kiểm soát nhiễm khuẩn,
            Chẩn đoán hình ảnh.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            5 phòng chức năng: Phòng Tổ chức cán bộ, Phòng Kế hoạch tổng hợp,
            Phòng Đào tạo- Nghiên cứu khoa học - Chỉ đạo tuyến, Phòng Điều dưỡng
            và Phòng Tài chính kế toán.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            4 tổ chức năng: Tổ Quản lý chất lượng, tổ Công nghệ thông tin, tổ
            Truyền thông, Tổ công tác xã hội.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            <Text strong style={{ textAlign: "left" }}>
              2. Tình hình nhân lực hiện nay
            </Text>
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Bệnh viện hiện nay có 303 cán bộ nhân viên, trong đó có:
          </Paragraph>
          <Title level={4} style={{ textAlign: "left" }}>
            II. Cơ sở hạ tầng và trang thiết bị:
          </Title>
          <Paragraph style={{ textAlign: "left" }}>
            <Text strong style={{ textAlign: "left" }}>
              1. Cơ sở hạ tầng
            </Text>
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            - Cơ sở hạ tầng khang trang, đồng bộ, thân thiện trên diện tích
            15.000 m2, gồm 5 khối nhà ( 1khối nhà 7 tầng, 4 khối nhà 2 tầng).
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            - 320 Giường nội trú.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            - 12 phòng khám thuộc khoa Khám bệnh.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            - 1 Phòng mổ với 3 phòng mổ đa năng.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            <Text strong style={{ textAlign: "left" }}>
              2. Trang thiết bị hiện đại
            </Text>
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            + Máy chụp CT, Lưu huyết não, đo độ canxi, Xquang kỹ thuật số, 04
            máy siêu âm màu, Máy Nội soi tiêu hóa, máy soi tử cung, Nội soi tay
            mũi họng, Hệ thống máy làm răng, máy mổ nội soi…
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            + Hệ thống máy và thiết bị hiện đại trong phòng mổ và hồi sức cấp
            cứu…
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            + Hệ thống máy móc vật lý trị liệu, phục hồi chức năng: Máy kéo dãn
            cột sống, Từ trường, Siêu âm điều trị, Điện xung, Giao thoa, Laser,
            Bồn thủy trị liệu, Hệ thống tập luyện đa năng…
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            + Máy điện châm đa năng, máy xông hơi thuốc…
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            + Hệ thống máy móc sản xuất, bào chế dược liệu: Máy dập viên, máy
            trộn thuốc, máy làm viên hoàn mềm, máy làm thuốc cốm, hệ thống đóng
            túi thuốc săc tự động…
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Trong những năm qua, dưới sự lãnh đạo của Đảng bộ, Ban Giám đốc,
            Bệnh viện Đa khoa Y học cổ truyền Hà Nội đã hoàn thành tốt nhiệm vụ
            được giao. Đến nay, Bệnh viện Đa khoa YHCT Hà Nội là một trong mô
            hình đầu tiên của cả nước là bệnh viện đa khoa kết hợp Y học hiện
            đại và y học cổ truyền, số lượng bệnh nhân đến khám và điều trị ngày
            càng tăng. Chất lượng chuyên môn và chất lượng dịch vụ ngày càng đảm
            bảo, trở thành địa chỉ tin cậy cho nhân dân Thủ Đô. Hiện tại, trung
            bình mỗi ngày Bệnh viện khám và điều trị ngoại trú cho gần 500 bệnh
            nhân ngoại trú và trên 350 bệnh nhân nằm điều trị nội trú kết hợp
            điều trị YHHĐ và YHCT ở tất cả các khoa, phẫu thuật sản khoa và
            ngoại khoa trung bình 6-10 bệnh nhân trong ngày.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Hướng tới tương lai bệnh viện sẽ xây dựng Bệnh viện Đa Khoa Y học cổ
            truyền với 400 giường bệnh, xây dựng mũi nhọn điều trị ở các khoa,
            triển khai thêm một số khoa phòng (Ung Bướu, điều trị ngoài da và
            thẩm mỹ…) kết hợp giữa hai nền y học hiện đại và y học cổ truyền đáp
            ứng được nhu cầu chăm sóc sức khỏe của nhân dân.
          </Paragraph>
        </Typography>
      </Card>
    </Flex>
  );
};
export default OrganizationScreen;
