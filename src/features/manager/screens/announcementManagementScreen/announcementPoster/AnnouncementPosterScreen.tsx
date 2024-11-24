import { AnnouncementPostDetail } from "../../../../../common/common.type";
import { Button, Flex, Image, Typography } from "antd";
import "./AnnouncementPoster.scss";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;
interface AnnouncementPosterScreenProps {
  announcementPost: AnnouncementPostDetail;
  handleUpdateAnnouncementPoster?: Function;
  handleDeleteAnnouncementPoster?: Function;
  handleAccessAnnouncementPost?: Function;
  isManagement?: boolean;
}
const AnnouncementPosterScreen = ({
  announcementPost,
  handleUpdateAnnouncementPoster,
  handleDeleteAnnouncementPoster,
  handleAccessAnnouncementPost,
  isManagement,
}: AnnouncementPosterScreenProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Flex
        className="item-post"
        align="center"
        justify="space-between"
        gap={12}
        onClick={() => handleAccessAnnouncementPost?.(announcementPost)}
      >
        <Flex className="item-content" align="flex-start" gap={12}>
          <Image preview={false} src={announcementPost.image} />
          <Flex
            className="item-text"
            vertical
            justify="flex-start"
            align="flex-start"
          >
            <Title level={5}>{announcementPost.title}</Title>
            <Text className="item-subtitle">{announcementPost.abstract}</Text>
          </Flex>
        </Flex>
        {isManagement ? (
          <Flex className="item-btn" align="center" gap={8}>
            <Button
              key="delete"
              className="btn-delete"
              onClick={(event) =>
                handleDeleteAnnouncementPoster?.(event, announcementPost)
              }
            >
              {t("content.common.Delete")}
            </Button>
            <Button
              key="edit"
              className="btn-edit"
              onClick={(event) =>
                handleUpdateAnnouncementPoster?.(event, announcementPost)
              }
            >
              {t("content.common.Update")}
            </Button>
          </Flex>
        ) : (
          <div></div>
        )}
      </Flex>
    </div>
  );
};
export default AnnouncementPosterScreen;
