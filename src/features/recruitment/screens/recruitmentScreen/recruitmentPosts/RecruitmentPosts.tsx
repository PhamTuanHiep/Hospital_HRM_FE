import { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { getRecruitmentPosts } from "../../../../../api/apiServices";
import { RecruitmentPostDetail } from "../../../../../common/common.type";
import { INIT_RECRUITMENT_POST_DETAIL } from "../../../../../common/common.constant";
import RecruitmentPoster from "../../../../manager/screens/recruitmentManagementScreen/recruitmentPoster/RecruitmentPoster";

const RecruitmentPosts = () => {
  const navigate = useNavigate();

  const [recruitmentPosts, setRecruitmentPosts] = useState<
    RecruitmentPostDetail[]
  >([INIT_RECRUITMENT_POST_DETAIL]);

  const fetchRecruitmentPosts = async () => {
    const res = await getRecruitmentPosts();
    if (res) {
      setRecruitmentPosts(res.data.data);
    }
  };

  useEffect(() => {
    fetchRecruitmentPosts();
  }, []);

  const handleAccessRecruitmentPost = (
    recruitmentPost: RecruitmentPostDetail
  ) => {
    navigate(`${recruitmentPost.recruitmentPostId}`);
  };
  return (
    <div>
      <Card>
        <Flex vertical gap={8}>
          {recruitmentPosts ? (
            recruitmentPosts.map((recruitmentPost, index) => {
              return (
                <div key={index}>
                  <RecruitmentPoster
                    recruitmentPost={recruitmentPost}
                    handleAccessRecruitmentPost={handleAccessRecruitmentPost}
                  />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </Flex>
      </Card>
    </div>
  );
};
export default RecruitmentPosts;
