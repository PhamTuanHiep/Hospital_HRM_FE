import { Card, Flex, Image, Typography } from "antd";

const { Text, Title } = Typography;
const BoardOfDirectorsScreen = () => {
  return (
    <Flex vertical gap={12}>
      <Card>
        <Title level={2}>Lãnh đạo Bệnh viện</Title>
      </Card>
      <Card title="Ban giám đốc đương nhiệm">
        <Image.PreviewGroup>
          <Flex vertical align="center" gap={12}>
            <Flex vertical align="center">
              <Image
                width={200}
                src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FBSCC%20V%C5%A9%20Nam.jpg?alt=media&token=309f4df8-d008-4148-bc6e-5930599f497c"
              />
              <Title level={5}>TTND.PGS.TS BSCC Vũ Nam</Title>
              <Text>Giám đốc bệnh viện</Text>
              <Text> (Từ 7/2017 đến nay) </Text>
            </Flex>

            <Flex gap={24}>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTT%C6%AFT.PGS.TS%20D%C6%B0%C6%A1ng%20Tr%E1%BB%8Dng%20Ngh%C4%A9a.jpg?alt=media&token=3695a2b2-8d71-4ef6-a605-8bd200c0e83f"
                />
                <Title level={5}>TTƯT.PGS.TS Dương Trọng Nghĩa</Title>
                <Text>Phó giám đốc Bệnh viện</Text>
                <Text> (Từ 9/2022 đến nay) </Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTS%20Tr%E1%BA%A7n%20Th%E1%BB%8B%20Ph%C6%B0%C6%A1ng%20Linh.jpg?alt=media&token=157890fa-eafa-44ae-8cf6-70c5c9a3e03a"
                />
                <Title level={5}>TS Trần Thị Phương Linh</Title>
                <Text>Phó giám đốc Bệnh viện</Text>
                <Text> (Từ 3/7/2023 đến nay) </Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTS.BS%20H%C3%A1n%20Huy%20Truy%E1%BB%81n.png?alt=media&token=312028fb-ee46-481d-b141-2284f6b9ec2e"
                />
                <Title level={5}>TS.BS Hán Huy Truyền</Title>
                <Text>Phó giám đốc Bệnh viện</Text>
                <Text>(Từ 9/2022 đến nay) </Text>
              </Flex>
            </Flex>
          </Flex>
        </Image.PreviewGroup>
      </Card>

      <Card title="lãnh đạo bệnh viện qua các thời kỳ">
        <Image.PreviewGroup>
          <Flex vertical align="center" gap={12}>
            <Flex gap={24} wrap justify="center">
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FB%C3%A1c%20s%C4%A9%20Nguy%E1%BB%85n%20V%C4%83n%20H%C6%B0%E1%BB%9Fng.jpg?alt=media&token=fd14487a-1763-44c9-8fc5-2f7cb35b6db2"
                />
                <Title level={5}>Bác sĩ Nguyễn Văn Hưởng</Title>
                <Text>Anh hùng lao động - Thầy thuốc nhân dân</Text>
                <Text>Viện trưởng (1957 - 1968)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FB%C3%A1c%20s%C4%A9%20L%C3%AA%20Kh%E1%BA%AFc%20Thi%E1%BB%81n.jpg?alt=media&token=0a0687d6-59e2-4756-ab4d-f16955134649"
                />
                <Title level={5}>Bác sĩ Lê Khắc Thiền</Title>
                <Text>Viện trưởng (1969 - 1974)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FB%C3%A1c%20s%C4%A9%20T%C3%B4%20V%C4%83n%20S%C3%A1ng.jpg?alt=media&token=9e402d73-bcb5-4f05-be04-8316fa4acb7d"
                />
                <Title level={5}>Bác sĩ Tô Văn Sáng</Title>
                <Text>Viện phó thứ nhất (1974 - 1977)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTTND.GS.B%C3%A1c%20s%C4%A9%20Ho%C3%A0ng%20B%E1%BA%A3o%20Ch%C3%A2u.jpg?alt=media&token=8e9cf43d-2214-44fd-a90c-82dc44f2c391"
                />
                <Title level={5}>TTND.GS.Bác sĩ Hoàng Bảo Châu</Title>
                <Text>Phó viện trưởng (1974 - 1977)</Text>
                <Text>Viện trưởng (1977 - 1995) </Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FGS.%20Tr%E1%BA%A7n%20Th%C3%BAy%2C%20Nh%C3%A0%20gi%C3%A1o%20%C6%B0u%20t%C3%BA.jpg?alt=media&token=40b685f0-1c7b-448e-a033-453fc94f72a3"
                />
                <Title level={5}>GS. Trần Thúy, Nhà giáo ưu tú</Title>
                <Text>Phó viện trưởng (1976 - 1994)</Text>
                <Text>Viện trưởng (1995 - 2003)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTTND.PGS.TS%20Chu%20Qu%E1%BB%91c%20Tr%C6%B0%E1%BB%9Dng.jpg?alt=media&token=25d4c709-a892-4d76-a497-a128bb66ea39"
                />
                <Title level={5}>TTND.PGS.TS Chu Quốc Trường</Title>
                <Text>Phó viện trưởng (1998 - 2003)</Text>
                <Text>Giám đốc Bệnh viện (2003 - 2010)</Text>
              </Flex>
            </Flex>

            <Flex vertical align="center">
              <Image
                width={200}
                src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTTND.PGS.TS%20Tr%E1%BA%A7n%20Qu%E1%BB%91c%20B%C3%ACnh.jpg?alt=media&token=38fdb0cd-f238-42b6-a13c-da849d44329a"
              />
              <Title level={5}>TTND.PGS.TS Trần Quốc Bình</Title>
              <Text>Giám đốc Bệnh viện </Text>
              <Text> (6/2010 - 6/2017)</Text>
            </Flex>

            <Flex justify="space-around" wrap gap={36}>
              {/* <Flex justify="space-around" align="flex-start"> */}
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FB%C3%A1c%20s%C4%A9%20Ph%E1%BA%A1m%20B%C3%A1%20C%C6%B0.jpg?alt=media&token=9eadde0a-a8cd-4243-933e-0e436efcea6d"
                />
                <Title level={5}>Bác sĩ Phạm Bá Cư</Title>
                <Text>Phó viện trưởng (1957 - 1959)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2F%C4%90%E1%BB%93ng%20ch%C3%AD%20Nguy%E1%BB%85n%20C%C3%B4ng%20Toan.jpg?alt=media&token=43e43c5e-4ca9-4fc1-9a07-32695dfffcc2"
                />
                <Title level={5}>Đồng chí Nguyễn Công Toan</Title>
                <Text>Phó viện trưởng (1959 - 1964)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2F%C4%90%E1%BB%93ng%20ch%C3%AD%20Nguy%E1%BB%85n%20Huy.jpg?alt=media&token=52ae1f97-f1f1-4f11-a75f-4be182c2d807"
                />
                <Title level={5}>Đồng chí Nguyễn Huy</Title>
                <Text>Phó viện trưởng (1964 - 1974) </Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FGS.%20L%C6%B0%C6%A1ng%20Y%20Nguy%E1%BB%85n%20S%E1%BB%B9%20L%C3%A2m.jpg?alt=media&token=7548c2df-83e6-4cb6-87ec-6a90dc965a05"
                />
                <Title level={5}>GS. Lương Y Nguyễn Sỹ Lâm</Title>
                <Text>Anh hùng lao động - Thầy thuốc nhân dân</Text>
                <Text>Phó viện trưởng (1974 - 1994) </Text>
              </Flex>
              {/* </Flex> */}
              {/* <Flex justify="space-around" align="flex-start"> */}
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2F%C4%90%E1%BB%93ng%20ch%C3%AD%20Ph%E1%BA%A1m%20Quang%20Xuy%E1%BB%81n.jpg?alt=media&token=ead36abc-bbf8-4ba4-add3-68c4e4c2247e"
                />
                <Title level={5}>Đồng chí Phạm Quang Xuyền</Title>
                <Text>Phó viện trưởng (1978 - 1988)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2F%C4%90%E1%BB%93ng%20ch%C3%AD%20Tr%E1%BA%A7n%20Tu%E1%BA%A5n%20Sinh.jpg?alt=media&token=cf354060-56f6-4fea-aabf-8eb3045c4188"
                />
                <Title level={5}>Đồng chí Trần Tuấn Sinh</Title>
                <Text>Phó viện trưởng (1977 - 1988)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FK%E1%BB%B9%20s%C6%B0%20V%C3%B5%20Th%E1%BB%8B%20L%C3%BD.jpg?alt=media&token=afdb5102-1ffe-4791-b1cf-56397a62b96f"
                />
                <Title level={5}>Kỹ sư Võ Thị Lý</Title>
                <Text>Phó Viện trưởng (1990-2003)</Text>
                <Text>Phó Giám đốc (2003-2005) </Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FB%C3%A1c%20s%C4%A9%20CKII%20Nguy%E1%BB%85n%20V%C4%83n%20Tuy%E1%BA%BFn.png?alt=media&token=9045d5bf-82c3-4d5e-9eb9-e31cc9d5d0ef"
                />
                <Title level={5}>Bác sĩ CKII Nguyễn Văn Tuyến</Title>
                <Text>Phó Giám đốc (1995-2005)</Text>
              </Flex>
              {/* </Flex> */}

              {/* <Flex justify="space-around" align="flex-start"> */}
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FB%C3%A1c%20s%C4%A9%20CKII%20Tr%E1%BB%8Bnh%20T%C3%B9ng.png?alt=media&token=2dd0a7d3-a77c-4f27-896c-7ef947ade517"
                />
                <Title level={5}>Bác sĩ CKII Trịnh Tùng</Title>

                <Text>Phó Giám đốc (03/2005-2011)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FB%C3%A1c%20s%C4%A9%20CKII%20Nguy%E1%BB%85n%20Th%E1%BB%8B%20Nhu%E1%BA%A7n.png?alt=media&token=65f86186-4829-4713-9996-a37d8b389b45"
                />
                <Title level={5}>Bác sĩ CKII Nguyễn Thị Nhuần</Title>
                <Text>Phó Giám đốc (01/2006-2008)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTT%C6%AFT.%20TS.%20L%C3%AA%20M%E1%BA%A1nh%20C%C6%B0%E1%BB%9Dng.png?alt=media&token=2d21194e-edb6-4062-930b-c0d798d19a7b"
                />
                <Title level={5}>TTƯT. TS. Lê Mạnh Cường</Title>
                <Text>Phó Giám đốc (10/2016 - 4/2022)</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FTR%C6%AF%C6%A0NG%20TH%E1%BB%8A%20XU%C3%82N%20H%C3%92A.jpg?alt=media&token=c427a09f-e39e-4bad-8439-5bc43f3e068a"
                />
                <Title level={5}>TTƯT. BSCKI. TRƯƠNG THỊ XUÂN HÒA</Title>

                <Text>Phó Giám đốc (04/2015 - 2020) </Text>
              </Flex>
              {/* </Flex> */}
              <Flex vertical align="center">
                <Image
                  width={200}
                  src="https://firebasestorage.googleapis.com/v0/b/images-of-hhrm-system.appspot.com/o/Board%20of%20Directors%2FNGUY%E1%BB%84N%20B%E1%BB%98I%20H%C6%AF%C6%A0NG.png?alt=media&token=6968de65-427a-4911-a017-188f0f9a9a7e"
                />
                <Title level={5}>TTƯT. PGS.TS. NGUYỄN BỘI HƯƠNG</Title>

                <Text>Phó Giám đốc (1/2011 - 9/2020) </Text>
              </Flex>
            </Flex>
          </Flex>
        </Image.PreviewGroup>
      </Card>
    </Flex>
  );
};
export default BoardOfDirectorsScreen;
