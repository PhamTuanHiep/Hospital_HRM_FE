import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Flex, Image, Typography } from "antd";
import "./AnnouncementPostDetail.scss";
import TextComponent from "../../../../../components/textComponent/TextComponent";
import { formatDateToDDMMYYYY } from "../../../../../common/common.helper";
import { useTranslation } from "react-i18next";
import { AnnouncementPostDetail as AnnouncementPostDetailType } from "../../../../../common/common.type";
import { INIT_ANNOUNCEMENT_POST_DETAIL } from "../../../../../common/common.constant";
import { getAnnouncementPost } from "../../../../../api/apiServices";

const { Text, Title } = Typography;
const AnnouncementPostDetail = () => {
  const { t } = useTranslation();
  const { announcementPostId } = useParams<{ announcementPostId?: string }>();

  const [announcementPost, setAnnouncementPost] =
    useState<AnnouncementPostDetailType>(INIT_ANNOUNCEMENT_POST_DETAIL);

  const fetchAnnouncementPost = async () => {
    const res = await getAnnouncementPost(Number(announcementPostId));
    console.log("res:", res);
    if (res) {
      setAnnouncementPost(res.data);
    }
  };

  useEffect(() => {
    fetchAnnouncementPost();
  }, []);

  return (
    <div id="card_announcement-post-detail">
      <Card
        title={
          <Flex
            vertical
            align="flex-start"
            className="card_recruitment-detail-title"
          >
            <Typography>
              <Title level={2}> {announcementPost.title}</Title>
              <Flex justify="space-between">
                <Text>
                  {`${t("content.common.CreatedAt")}: ${formatDateToDDMMYYYY(
                    announcementPost.createdAt
                  )}`}
                </Text>
                <Text>{`${t("content.announcementPost.Author")}: ${
                  announcementPost.user?.fullName
                }`}</Text>
              </Flex>
            </Typography>
          </Flex>
        }
      >
        <Flex vertical>
          <Flex vertical align="center">
            {announcementPost.image ? (
              <Image
                preview={false}
                src={announcementPost.image}
                alt="ảnh bìa thông báo"
              ></Image>
            ) : (
              <div></div>
            )}
          </Flex>

          <Flex vertical align="flex-start">
            <Typography>
              <Title className="section" level={3}>
                {t("content.announcementPost.Abstract")}:
              </Title>
              <TextComponent text={announcementPost.abstract} />
            </Typography>
          </Flex>

          <Flex vertical align="flex-start">
            <Typography>
              <Title className="section" level={3}>
                {t("content.announcementPost.ContentDetail")}:
              </Title>
              <TextComponent text={announcementPost.contentDetail} />
            </Typography>
          </Flex>

          <Flex vertical align="flex-start">
            <Typography>
              <Title className="section" level={3}>
                {`${t("content.announcementPost.Contact")}:`}
              </Title>
              <TextComponent text={announcementPost.contact} />
            </Typography>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};
export default AnnouncementPostDetail;
