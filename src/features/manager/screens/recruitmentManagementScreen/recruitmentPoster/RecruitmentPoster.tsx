import { RecruitmentPostDetail } from "../../../../../common/common.type";
import { Button, Flex, Image, Typography } from "antd";
import "./RecruitmentPoster.scss";

const { Text, Title } = Typography;
interface RecruitmentPosterProps {
  reset: Boolean;
  setReset: Function;
  recruitmentPost: RecruitmentPostDetail;
}
const RecruitmentPoster = ({
  reset,
  setReset,
  recruitmentPost,
}: RecruitmentPosterProps) => {
  const handleDeleteRecruitmentPoster = () => {
    alert("delete");
  };
  const handleUpdateRecruitmentPoster = () => {
    alert("update");
  };
  return (
    <Flex className="item-post" align="center" justify="space-between" gap={12}>
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
        <Button className="btn-delete" onClick={handleDeleteRecruitmentPoster}>
          Delete
        </Button>
        <Button className="btn-edit" onClick={handleUpdateRecruitmentPoster}>
          Update
        </Button>
      </Flex>
    </Flex>
  );
};
export default RecruitmentPoster;
