import { Card, Flex, Image, Typography } from "antd";
import "./DepartmentScreen.scss";

const { Paragraph, Title } = Typography;

const DepartmentScreen = () => {
  return (
    <Card
      id="public-department"
      title="Danh sách các khoa lâm sàng và cận lâm sàng"
    >
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
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20DINH%20D%C6%AF%E1%BB%A0NG.jpg?alt=media&token=45bba45c-32c1-4d02-8896-3c4ea772079a"
            />

            <Title level={5}>KHOA DINH DƯỠNG</Title>
            <Paragraph>
              Được thành lập với nhiệm vụ tổ chức khám, tư vấn dinh dưỡng cho
              bệnh nhân nội và ngoại trú
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20CH%E1%BA%A8N%20%C4%90O%C3%81N%20H%C3%8CNH%20%E1%BA%A2NH.jpg?alt=media&token=a7ca139c-fe0b-474b-8bf9-56c86a026742"
            />

            <Title level={5}>KHOA CHẨN ĐOÁN HÌNH ẢNH</Title>
            <Paragraph>
              Luôn luôn đổi mới cùng với những tiến bộ khoa học kỹ thuật trên
              thế giới .....
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20X%C3%89T%20NGHI%E1%BB%86M.jpg?alt=media&token=cd9d8750-0861-4ad8-8833-108e70e0344f"
            />

            <Title level={5}>KHOA XÉT NGHIỆM</Title>
            <Paragraph>
              Thực hiện xét nghiệm huyết học, sinh hóa, vi sinh trên các máy tự
              động kỹ thuật cao.....
            </Paragraph>
          </Flex>
        </Flex>

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
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20D%C6%AF%E1%BB%A2C.jpg?alt=media&token=5f63538d-eef5-41d6-8354-5cfd73488453"
            />

            <Title level={5}>KHOA DƯỢC</Title>
            <Paragraph>
              Tham gia nghiên cứu khoa học, cải tiến dạng thuốc y học cổ truyền
              cho người bệnh tiện sử dụng.....
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FPH%C3%92NG%20M%E1%BB%94.jpg?alt=media&token=17d62da1-9b70-43c7-b07a-2dab9d757aaa"
            />

            <Title level={5}>PHÒNG MỔ</Title>
            <Paragraph>
              Được thành lập 1/1999 có trách nhiệm đảm bảo công tác phẫu thuật
              của các khoa Ngoại, Sản, Ngũ quan.
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20PH%E1%BB%A4%20S%E1%BA%A2N.jpg?alt=media&token=a2886670-c9f3-4861-af81-860779466499"
            />

            <Title level={5}>KHOA PHỤ SẢN</Title>
            <Paragraph>
              Điều trị trung bình 600 - 700 bệnh nhân/năm, kết hợp khám, điều
              trị ngoại trú tại khoa Khám bệnh.
            </Paragraph>
          </Flex>
        </Flex>

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
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20NG%C5%A8%20QUAN.jpg?alt=media&token=7108a773-6b41-408e-aa4b-c01e6e934bb5"
            />

            <Title level={5}>KHOA NGŨ QUAN</Title>
            <Paragraph>
              Khám bệnh, điều trị nội trú và ngoại trú bằng phương pháp YHHĐ có
              kết hợp với YHCT
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20PH%E1%BB%A4C%20H%E1%BB%92I%20CH%E1%BB%A8C%20N%C4%82NG.jpg?alt=media&token=e244a32e-0aa1-4d92-ad41-9fe61d5a3f9a"
            />

            <Title level={5}>KHOA PHỤC HỒI CHỨC NĂNG</Title>
            <Paragraph>
              Được thành lập với nhiệm vụ khám bệnh, chữa bệnh phục hồi chức
              năng kết hợp với y học cổ truyền
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20CH%C3%82M%20C%E1%BB%A8U.jpg?alt=media&token=1552ce7c-4e5b-4661-985d-57d1571d4320"
            />

            <Title level={5}>KHOA CHÂM CỨU</Title>
            <Paragraph>
              Khoa có thế mạnh điều trị và sử dụng các phương pháp y học cổ
              truyền như châm cứu, xoa bóp bấm huyệt,....
            </Paragraph>
          </Flex>
        </Flex>

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
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20L%C3%83O.jpg?alt=media&token=f512cee9-3640-4015-86c0-128b6a669e10"
            />

            <Title level={5}>KHOA LÃO</Title>
            <Paragraph>
              Điều trị nội trú cho người bệnh cao tuổi với phương pháp điều trị
              kết hợp Y học hiện đại với Y học cổ truyền
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20NHI.jpg?alt=media&token=83c78e18-115e-434f-ad0c-a50be44385f4"
            />

            <Title level={5}>KHOA NHI</Title>
            <Paragraph>
              Nhận khám, điều trị các bệnh thường gặp ở trẻ em bằng y học hiện
              đại và kết hợp YHCT .....
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20KI%E1%BB%82M%20SO%C3%81T%20NHI%E1%BB%84M%20KHU%E1%BA%A8N.jpg?alt=media&token=80630a79-fc49-45cb-bea7-db544d6403bf"
            />

            <Title level={5}>KHOA KIỂM SOÁT NHIỄM KHUẨN</Title>
            <Paragraph>
              Được thành lập từ năm 2003 có nhiệm vụ chỉ đạo thực hiện quy chế
              về kiểm soát nhiễm khuẩn trong Bệnh viện...
            </Paragraph>
          </Flex>
        </Flex>

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
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20N%E1%BB%98I%20T%C3%94NG%20H%E1%BB%A2P.jpg?alt=media&token=511e45f5-c560-473a-b486-4df1d3333e66"
            />

            <Title level={5}>KHOA NỘI TÔNG HỢP</Title>
            <Paragraph>
              Được thành lập với nhiệm vụ khám và điều trị toàn diện người bệnh
              trong các lĩnh vực về Nội khoa và Truyền nhiễm
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20H%E1%BB%92I%20S%E1%BB%A8C%20C%E1%BA%A4P%20C%E1%BB%A8U.jpg?alt=media&token=7910c436-0ff4-4ca8-a75b-43601c009ff6"
            />

            <Title level={5}>KHOA HỒI SỨC CẤP CỨU</Title>
            <Paragraph>
              Khoa được thành lập 5/10/2000 với nhiệm vụ tiếp nhận và điều trị
              tất cả các trường hợp bệnh nhân nặng, bệnh lý phức tạp cần hồi sức
            </Paragraph>
          </Flex>
          <Flex className="item-department" vertical align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20KH%C3%81M%20B%E1%BB%86NH.jpg?alt=media&token=d995ce47-2a6c-4d9c-b8bb-d64cc054aa81"
            />

            <Title level={5}>KHOA KHÁM BỆNH</Title>
            <Paragraph>
              Là một trong những khoa nòng cốt của Bệnh viện Đa khoa YHCT Hà
              Nội, mỗi ngày, khoa Khám bệnh tiếp nhận khám cho 400-500 người
              bệnh...
            </Paragraph>
          </Flex>
        </Flex>

        <Flex justify="center">
          <Flex className="item-department" vertical wrap align="center">
            <Image
              height={200}
              src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/departments%2FKHOA%20NGO%E1%BA%A0I.jpg?alt=media&token=1be9359b-fd79-4f16-aa41-ec6bb0d59e41"
            />

            <Title level={5}>KHOA NGOẠI</Title>
            <Paragraph>
              Hiện tại khoa Ngoại có 37 giường điều trị đáp ứng đầy đủ các tiêu
              chuẩn chăm sóc bệnh nhân sau phẫu thuật, trong đó có 4 giường điều
              trị tự nguyện nằm trong khu khép kín.
            </Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default DepartmentScreen;
