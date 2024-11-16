import { Button, Card, Flex } from "antd";
import { MouseEvent, useEffect, useState } from "react";

import "./AnnouncementManagementScreen.scss";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AnnouncementPosterScreen from "./announcementPoster/AnnouncementPosterScreen";
import { AnnouncementPostDetail } from "../../../../common/common.type";
import { INIT_ANNOUNCEMENT_POST_DETAIL } from "../../../../common/common.constant";
import { getAnnouncementPosts } from "../../../../api/apiServices";
import CreateAnnouncementPostModal from "./createAnnouncementPostModal/CreateAnnouncementPostModal";
import UpdateAnnouncementPostModal from "./updateAnnouncementPostModal/UpdateAnnouncementPostModal";
import DeleteAnnouncementPostModal from "./deleteAnnouncementPostModal/DeleteRecruitmentPostModal";

const AnnouncementManagementScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [announcementPosts, setAnnouncementPosts] = useState<
    AnnouncementPostDetail[]
  >([INIT_ANNOUNCEMENT_POST_DETAIL]);
  const [nowAnnouncementPost, setNowAnnouncementPost] =
    useState<AnnouncementPostDetail>(INIT_ANNOUNCEMENT_POST_DETAIL);

  const [isModalOpenCreate, setIsModalOpenCreate] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);

  const [reset, setReset] = useState<boolean>(false);
  console.log("announcementPosts:", announcementPosts);
  const fetchAnnouncementPosts = async () => {
    const res = await getAnnouncementPosts();
    if (res) {
      setAnnouncementPosts(res.data.data);
    }
  };

  useEffect(() => {
    fetchAnnouncementPosts();
  }, [reset]);

  const handleCreateRecruitmentPost = () => {
    setIsModalOpenCreate(true);
  };

  const handleUpdateAnnouncementPoster = (
    event: MouseEvent<HTMLElement, MouseEvent>,
    announcementPost: AnnouncementPostDetail
  ) => {
    event.stopPropagation();

    setNowAnnouncementPost(announcementPost);
    setIsModalOpenUpdate(true);
    setReset(false);
  };

  const handleDeleteAnnouncementPoster = (
    event: MouseEvent<HTMLElement, MouseEvent>,
    announcementPost: AnnouncementPostDetail
  ) => {
    event.stopPropagation();

    setNowAnnouncementPost(announcementPost);
    setIsModalOpenDelete(true);
    setReset(false);
  };

  // const handleAccessAnnouncementPost = (
  //   announcementPost: AnnouncementPostDetail
  // ) => {
  //   navigate(
  //     `${recruitmentPaths.RECRUITMENT}${announcementPost.announcementPostId}`
  //   );
  // };
  return (
    <div>
      <Card
        id="announcement-posts"
        title={t("content.announcementPost.AnnouncementManagementTitle")}
        extra={
          <Button className="btn-create" onClick={handleCreateRecruitmentPost}>
            {t("content.announcementPost.AddPost")}
          </Button>
        }
      >
        <Flex vertical gap={8}>
          {announcementPosts ? (
            announcementPosts.map((announcementPost, index) => {
              return (
                <div key={index}>
                  <AnnouncementPosterScreen
                    announcementPost={announcementPost}
                    handleUpdateAnnouncementPoster={
                      handleUpdateAnnouncementPoster
                    }
                    handleDeleteAnnouncementPoster={
                      handleDeleteAnnouncementPoster
                    }
                    isManagement
                    // handleAccessAnnouncementPost={handleAccessAnnouncementPost}
                  />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </Flex>
      </Card>
      <CreateAnnouncementPostModal
        isModalOpen={isModalOpenCreate}
        setIsModalOpen={setIsModalOpenCreate}
        setReset={setReset}
      />
      <UpdateAnnouncementPostModal
        isModalOpen={isModalOpenUpdate}
        setIsModalOpen={setIsModalOpenUpdate}
        setReset={setReset}
        announcementPost={nowAnnouncementPost}
        confirmLoading={!nowAnnouncementPost}
      />
      <DeleteAnnouncementPostModal
        isModalOpen={isModalOpenDelete}
        setIsModalOpen={setIsModalOpenDelete}
        setReset={setReset}
        announcementPost={nowAnnouncementPost}
        confirmLoading={!nowAnnouncementPost}
      />
    </div>
  );
};
export default AnnouncementManagementScreen;
