import { Button, Card, Flex } from "antd";

import { useEffect, useState } from "react";
import { getRecruitmentPosts } from "../../../../api/apiServices";
import { RecruitmentPostDetail } from "../../../../common/common.type";
import { INIT_RECRUITMENT_POST_DETAIL } from "../../../../common/common.constant";
import "./RecruitmentManagementScreen.scss";
import CreateRecruitmentPostModal from "./createRecruitmentPostModal/CreateRecruitmentPostModal";
import RecruitmentPoster from "./recruitmentPoster/RecruitmentPoster";

const RecruitmentManagementScreen = () => {
  const [recruitmentPosts, setRecruitmentPosts] = useState<
    RecruitmentPostDetail[]
  >([INIT_RECRUITMENT_POST_DETAIL]);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState<boolean>(false);

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const fetchRecruitmentPosts = async () => {
    const res = await getRecruitmentPosts();
    if (res) {
      setRecruitmentPosts(res.data.data);
    }
  };

  useEffect(() => {
    fetchRecruitmentPosts();
  }, [reset]);

  const handleCreateRecruitmentPost = () => {
    setIsModalOpenCreate(true);
  };

  return (
    <div>
      <Card
        id="recruitment-posts"
        title="Quan ly tuyen dung"
        extra={
          <Button className="btn-create" onClick={handleCreateRecruitmentPost}>
            Add Post
          </Button>
        }
      >
        <Flex vertical gap={8}>
          {recruitmentPosts ? (
            recruitmentPosts.map((recruitmentPost, index) => {
              return (
                <div key={index}>
                  <RecruitmentPoster
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
      <CreateRecruitmentPostModal
        isModalOpen={isModalOpenCreate}
        setIsModalOpen={setIsModalOpenCreate}
        setReset={setReset}
      />
    </div>
  );
};
export default RecruitmentManagementScreen;
