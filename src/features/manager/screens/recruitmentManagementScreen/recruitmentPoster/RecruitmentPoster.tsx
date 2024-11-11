import { RecruitmentPostDetail } from "../../../../../common/common.type";
import { Button, Flex, Image, Typography } from "antd";
import "./RecruitmentPoster.scss";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;
interface RecruitmentPosterProps {
  recruitmentPost: RecruitmentPostDetail;
  handleUpdateRecruitmentPoster: Function;
  handleDeleteRecruitmentPoster: Function;
}
const RecruitmentPoster = ({
  recruitmentPost,
  handleUpdateRecruitmentPoster,
  handleDeleteRecruitmentPoster,
}: RecruitmentPosterProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Flex
        className="item-post"
        align="center"
        justify="space-between"
        gap={12}
      >
        <Flex className="item-content" align="flex-start" gap={12}>
          <Image preview={false} src={recruitmentPost.image} />
          <Flex
            className="item-text"
            vertical
            justify="flex-start"
            align="flex-start"
          >
            <Title level={5}>{recruitmentPost.title}</Title>
            <Text className="item-subtitle">{recruitmentPost.subtitle}</Text>
          </Flex>
        </Flex>
        <Flex className="item-btn" align="center" gap={8}>
          <Button
            key="delete"
            className="btn-delete"
            onClick={(e) => handleDeleteRecruitmentPoster(recruitmentPost)}
          >
            {t("content.common.Delete")}
          </Button>
          <Button
            key="edit"
            className="btn-edit"
            onClick={(e) => handleUpdateRecruitmentPoster(recruitmentPost)}
          >
            {t("content.common.Update")}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};
export default RecruitmentPoster;
