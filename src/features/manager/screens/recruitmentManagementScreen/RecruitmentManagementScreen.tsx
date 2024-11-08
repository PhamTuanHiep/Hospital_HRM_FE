import { Button, Card, Flex } from "antd";
import RecruitmentPost from "./recruitmentPost/RecruitmentPost";
import { useEffect, useState } from "react";
import { getRecruitmentPosts } from "../../../../api/apiServices";
import { RecruitmentPostDetail } from "../../../../common/common.type";
import { INIT_RECRUITMENT_POST_DETAIL } from "../../../../common/common.constant";
import "./RecruitmentManagementScreen.scss";

const RecruitmentManagementScreen = () => {
  const [recruitmentPosts, setRecruitmentPosts] = useState<
    RecruitmentPostDetail[]
  >([INIT_RECRUITMENT_POST_DETAIL]);
  const [reset, setReset] = useState<Boolean>(false);
  const fetchRecruitmentPosts = async () => {
    const res = await getRecruitmentPosts();
    if (res) {
      setRecruitmentPosts(res.data.data);
    }
  };

  useEffect(() => {
    fetchRecruitmentPosts();
  }, [reset]);
  console.log("recruitmentPosts:", recruitmentPosts);
  return (
    <Card
      id="recruitment-posts"
      title="Quan ly tuyen dung"
      extra={<Button className="btn-create">Add Post</Button>}
    >
      <Flex vertical gap={8}>
        {recruitmentPosts ? (
          recruitmentPosts.map((recruitmentPost, index) => {
            return (
              <div key={index}>
                <RecruitmentPost
                  reset={reset}
                  setReset={setReset}
                  recruitmentPost={recruitmentPost}
                />
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </Flex>
    </Card>
  );
};
export default RecruitmentManagementScreen;
