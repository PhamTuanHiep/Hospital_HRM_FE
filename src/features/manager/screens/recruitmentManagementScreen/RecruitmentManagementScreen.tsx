import { Button, Card, Flex } from "antd";
import { useEffect, useState } from "react";
import { getRecruitmentPosts } from "../../../../api/apiServices";
import { RecruitmentPostDetail } from "../../../../common/common.type";
import { INIT_RECRUITMENT_POST_DETAIL } from "../../../../common/common.constant";
import "./RecruitmentManagementScreen.scss";
import CreateRecruitmentPostModal from "./createRecruitmentPostModal/CreateRecruitmentPostModal";
import RecruitmentPoster from "./recruitmentPoster/RecruitmentPoster";
import UpdateRecruitmentPostModal from "./updateRecruitmentPostModal/UpdateRecruitmentPostModal";

const RecruitmentManagementScreen = () => {
  const [recruitmentPosts, setRecruitmentPosts] = useState<
    RecruitmentPostDetail[]
  >([INIT_RECRUITMENT_POST_DETAIL]);
  const [nowRecruitmentPost, setNowRecruitmentPost] =
    useState<RecruitmentPostDetail>(INIT_RECRUITMENT_POST_DETAIL);

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
    setReset(false);
  }, [reset]);

  const handleCreateRecruitmentPost = () => {
    setIsModalOpenCreate(true);
  };

  const handleUpdateRecruitmentPoster = (
    recruitmentPost: RecruitmentPostDetail
  ) => {
    console.log("recruitmentPost-update:", recruitmentPost);
    setNowRecruitmentPost(recruitmentPost);
    setIsModalOpenUpdate(true);
  };
  const handleDeleteRecruitmentPoster = (
    recruitmentPost: RecruitmentPostDetail
  ) => {
    console.log("recruitmentPost-delete:", recruitmentPost);
    // setIsModalOpenUpdate(true);
  };
  console.log("nowRecruitmentPost:", nowRecruitmentPost);

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
                    recruitmentPost={recruitmentPost}
                    handleUpdateRecruitmentPoster={
                      handleUpdateRecruitmentPoster
                    }
                    handleDeleteRecruitmentPoster={
                      handleDeleteRecruitmentPoster
                    }
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
      <UpdateRecruitmentPostModal
        isModalOpen={isModalOpenUpdate}
        setIsModalOpen={setIsModalOpenUpdate}
        setReset={setReset}
        recruitmentPost={nowRecruitmentPost}
        confirmLoading={!nowRecruitmentPost}
      />
    </div>
  );
};
export default RecruitmentManagementScreen;
