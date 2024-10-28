import { Card, Flex, Image, Typography } from "antd";
import "./ClinicScreen.scss";

const { Paragraph, Title } = Typography;

const ClinicScreen = () => {
  return (
    <Card id="public-clinic" title="Các phòng chức năng">
      <Flex className="list-department" vertical gap={24}>
        <Flex justify="space-between">
          <Flex
            className="item-department"
            vertical
            wrap
            align="center"
            justify="space-between"
          >
            <Image
              height={200}
              alt="PHÒNG TỔ CHỨC HÀNH CHÍNH"
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/clinics%2FPH%C3%92NG%20T%E1%BB%94%20CH%E1%BB%A8C%20H%C3%80NH%20CH%C3%8DNH.jpg?alt=media&token=a9f8281f-88ef-43e1-b318-cb542e43a717"
            />

            <Title level={5}>PHÒNG TỔ CHỨC HÀNH CHÍNH</Title>
            <Paragraph>
              Chịu trách nhiệm trước Giám đốc về tổ chức thực hiện công tác tổ
              chức cán bộ....
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/clinics%2FPH%C3%92NG%20%C4%90I%E1%BB%80U%20D%C6%AF%E1%BB%A0NG.jpg?alt=media&token=3a2e190c-90ed-4615-ad77-beba5d0727a8"
            />

            <Title level={5}>PHÒNG ĐIỀU DƯỠNG</Title>
            <Paragraph>
              Phòng có nhiệm vụ tổ chức chỉ đạo đôn đốc kiểm tra, đào tạo, nâng
              cao trình độ cho y tá(điều dưỡng) ....
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/clinics%2FPH%C3%92NG%20%C4%90%C3%80O%20T%E1%BA%A0O%20-%20NGHI%C3%8AN%20C%E1%BB%A8U%20KHOA%20H%E1%BB%8CC%20V%C3%80%20CH%E1%BB%88%20%C4%90%E1%BA%A0O%20TUY%E1%BA%BEN.jpg?alt=media&token=b64d5019-56d6-44b0-ac09-7395220b6e0d"
            />

            <Title level={5}>
              PHÒNG ĐÀO TẠO - NGHIÊN CỨU KHOA HỌC VÀ CHỈ ĐẠO TUYẾN
            </Title>
            <Paragraph>
              Tổ chức tiếp nhận và triển khai các kỹ thuật được tuyến trên
              chuyển giao ...
            </Paragraph>
          </Flex>
        </Flex>

        <Flex justify="center">
          <Flex
            className="item-department"
            vertical
            wrap
            align="center"
            justify="space-between"
          >
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/clinics%2FPH%C3%92NG%20K%E1%BA%BE%20HO%E1%BA%A0CH%20T%E1%BB%94NG%20H%E1%BB%A2P.jpg?alt=media&token=3a10ab4d-d66e-45de-b9dd-b6260c610755"
            />

            <Title level={5}>PHÒNG KẾ HOẠCH TỔNG HỢP</Title>
            <Paragraph>
              Tham mưu cho Ban Giám đốc trong việc xác định và giao các chỉ tiêu
              hoạt động của các Khoa, Phòng ....
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/clinics%2FPH%C3%92NG%20T%C3%80I%20CH%C3%8DNH%20K%E1%BA%BE%20TO%C3%81N.jpg?alt=media&token=b18b9ecd-3acb-4d0c-8985-0626f2ccfe28"
            />

            <Title level={5}>PHÒNG TÀI CHÍNH KẾ TOÁN</Title>
            <Paragraph>
              Phòng Tài chính kế toán có nhiệm vụ tham mưu giúp Ban giám đốc
              thực hiện chức năng quản lý tài chính ...
            </Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ClinicScreen;
