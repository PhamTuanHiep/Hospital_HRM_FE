import { Button, Card, Flex } from "antd";
import { MouseEvent, useEffect, useState } from "react";
import { getRecruitmentPosts } from "../../../../api/apiServices";
import { RecruitmentPostDetail } from "../../../../common/common.type";
import { INIT_RECRUITMENT_POST_DETAIL } from "../../../../common/common.constant";
import "./RecruitmentManagementScreen.scss";
import CreateRecruitmentPostModal from "./createRecruitmentPostModal/CreateRecruitmentPostModal";
import RecruitmentPoster from "./recruitmentPoster/RecruitmentPoster";
import UpdateRecruitmentPostModal from "./updateRecruitmentPostModal/UpdateRecruitmentPostModal";
import DeleteRecruitmentPostModal from "./deleteRecruitmentPostModal/DeleteRecruitmentPostModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { recruitmentPaths } from "../../../recruitment/constants/constant.path";

const RecruitmentManagementScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  }, [reset]);

  const handleCreateRecruitmentPost = () => {
    setIsModalOpenCreate(true);
  };

  const handleUpdateRecruitmentPoster = (
    event: MouseEvent<HTMLElement, MouseEvent>,
    recruitmentPost: RecruitmentPostDetail
  ) => {
    event.stopPropagation();

    setNowRecruitmentPost(recruitmentPost);
    setIsModalOpenUpdate(true);
    setReset(false);
  };

  const handleDeleteRecruitmentPoster = (
    event: MouseEvent<HTMLElement, MouseEvent>,
    recruitmentPost: RecruitmentPostDetail
  ) => {
    event.stopPropagation();

    setNowRecruitmentPost(recruitmentPost);
    setIsModalOpenDelete(true);
    setReset(false);
  };

  const handleAccessRecruitmentPost = (
    recruitmentPost: RecruitmentPostDetail
  ) => {
    navigate(
      `${recruitmentPaths.RECRUITMENT}${recruitmentPost.recruitmentPostId}`
    );
  };
  return (
    <div>
      <Card
        id="recruitment-posts"
        title={t("content.recruitmentPost.RecruitmentManagementTitle")}
        extra={
          <Button className="btn-create" onClick={handleCreateRecruitmentPost}>
            {t("content.recruitmentPost.AddPost")}
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
                    isManagement
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
      <DeleteRecruitmentPostModal
        isModalOpen={isModalOpenDelete}
        setIsModalOpen={setIsModalOpenDelete}
        setReset={setReset}
        recruitmentPost={nowRecruitmentPost}
        confirmLoading={!nowRecruitmentPost}
      />
    </div>
  );
};
export default RecruitmentManagementScreen;
