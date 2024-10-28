import { Card, Flex, Image, Typography } from "antd";
import "./VisionScreen.scss";

const { Paragraph, Text } = Typography;

const VisionScreen = () => {
  return (
    <Flex id="vision" vertical gap={12}>
      <Card title="CÁC THÀNH TÍCH ĐẠT ĐƯỢC">
        <Image.PreviewGroup>
          <Flex justify="space-between">
            <Flex vertical align="center">
              <Image
                width={300}
                src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/achievements%2FHu%C3%A2n%20ch%C6%B0%C6%A1ng%20lao%20%C4%91%E1%BB%99ng%20h%E1%BA%A1ng%20nh%E1%BA%A5t.jpg?alt=media&token=b98be0bc-5cf2-4df2-bcfe-cce434594589"
              />

              <Text>Huân chương lao động hạng nhất</Text>
            </Flex>
            <Flex vertical align="center">
              <Image
                width={300}
                src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/achievements%2FHu%C3%A2n%20ch%C6%B0%C6%A1ng%20lao%20%C4%91%E1%BB%99ng%20h%E1%BA%A1ng%20nh%C3%AC.jpg?alt=media&token=27ebb9bf-b3a1-4ae6-9183-52f42270d3d3"
              />

              <Text>Huân chương lao động hạng nhì</Text>
            </Flex>
            <Flex vertical align="center">
              <Image
                width={300}
                src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/achievements%2FHu%C3%A2n%20ch%C6%B0%C6%A1ng%20lao%20%C4%91%E1%BB%99ng%20h%E1%BA%A1ng%20ba.jpg?alt=media&token=08ef1459-d5a8-405e-ba3c-0b0783e01c2c"
              />

              <Text>Huân chương lao động hạng ba</Text>
            </Flex>
          </Flex>
        </Image.PreviewGroup>
      </Card>
      <Card title="TẦM NHÌN - SỨ MỆNH">
        <Typography>
          <Paragraph style={{ textAlign: "left" }}>
            <Text strong>Bệnh viện đa khoa y học cổ truyền Hà Nội </Text>
            có nhiệm vụ tổ chức cấp cứu, khám bệnh, điều trị ngoại trú, nội trú;
            chăm sóc, phục hồi chức năng bằng Y học cổ truyền, kết hợp Y học cổ
            truyền với Y học hiện đại cho nhân dân thuộc đại bàn thành phố Hà
            Nội và các tỉnh lân cận; Tổ chức khám và chứng nhận sức khỏe theo
            quy định của Bộ Y tế hướng dẫn khám sức khỏe; Triển khai nghiên cứu
            khoa học, nghiên cứu kế thừa, nghiên cứu ứng dụng và kết hợp Y học
            cổ truyền với Y học hiện đại; Chuyển giao các kết quả nghiên cứu
            khoa học, bảo tồn, kế thừa, ứng dụng theo quy định của pháp luật.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Tiếp nhận, tạo điều kiện và hướng dẫn cho học sinh, sinh viên, học
            viên của các cơ sở đào tạo và các đơn vị có nhu cầu đến thực hành
            lâm sàng tại bệnh viện. Hàng năm bệnh viện tiếp nhận trên 10.000 học
            sinh, sinh viên của các trường Đại học Y Hà Nội, Học Viện Y Dược học
            cổ truyền Việt Nam, Cao đằng Y Hà Nội, trung cấp Y Dược Hà Nội…
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Tổ chức đào tạo liên tục cho cán bộ y tế về lĩnh vực y, dược cổ
            truyền và cấp giấy chứng nhận bồi dưỡng và thực hành lâm sàng cho
            các đối tượng đã hoàn thành chương trình bồi dưỡng, thực hành tại
            bệnh viện.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Lập kế hoạch chỉ đạo, triển khai công tác chỉ đạo tuyến về y, dược
            cổ truyền, kết hợp Y học cổ truyền với Y học hiện đại cho 30 bệnh
            viện Đa khoa, Chuyên khoa và 31 trung tâm y tế quận huện trực thuộc
            Sở Y Tế Hà Nội; kiểm tra, giám sát việc thực hiện các quy chế chuyên
            môn, kỹ thuật về y, dược cổ truyền cho các đơn vị tuyến dưới và tổ
            chức tiếp nhận, chuyển giao kỹ thuật.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Phối hợp với Hội ( Hội Đông Y, Hội Châm cứu…) chỉ đạo xây dựng vườn
            thuốc nam trong các cơ sở y tế và thực hiện công tác chăm sóc sức
            khỏe cộng đồng bằng y, dược cổ truyền.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Hướng dẫn người bệnh và người dân phòng bệnh bằng các phương pháp y
            học cổ truyền và phối hợp với các đơn vị có liên quan trong công tác
            phòng, chống dịch bệnh khi có dịch bệnh xảy ra trên địa bàn.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Tổ chức tuyên truyền các chủ trương chính sách của Đảng và Nhà nước
            về công tác y, dược cổ truyền;Tuyên truyền ứng dụng các biện pháp y,
            dược cổ truyền hợp lý, an toàn, hiệu quả trong bảo vệ, chăm sóc và
            nâng cao sức khỏe nhân dân; Tuyên truyền vận động nhân dân nuôi
            trồng, thu hái, bảo tồn và sử dụng có hiệu quả cây con làm thuốc.
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Bào chế, sản xuất thuốc đông y, thuốc từ dược liệu đáp ứng nhu cầu
            của người bệnh và nhân dân trên địa bàn;
          </Paragraph>
          <Paragraph style={{ textAlign: "left" }}>
            Hợp tác quốc tế về y, dược cổ truyền với các tổ chức và cá nhân nước
            ngoài.
          </Paragraph>
        </Typography>
      </Card>
    </Flex>
  );
};
export default VisionScreen;
