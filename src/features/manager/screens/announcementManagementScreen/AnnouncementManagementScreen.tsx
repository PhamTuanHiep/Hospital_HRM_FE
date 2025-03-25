import { Button, Card, Flex } from "antd";
import { MouseEvent, useEffect, useState } from "react";

import "./AnnouncementManagementScreen.scss";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AnnouncementPosterScreen from "./announcementPoster/AnnouncementPosterScreen";
import {
  AnnouncementPostDetail,
  CommonQueryParams,
  PageResponse,
} from "../../../../common/common.type";
import {
  INIT_ANNOUNCEMENT_POST_DETAIL,
  INIT_PAGE_RESPONSE,
  QueryParamsWithListPosts,
} from "../../../../common/common.constant";
import { getAnnouncementPosts } from "../../../../api/apiServices";
import CreateAnnouncementPostModal from "./createAnnouncementPostModal/CreateAnnouncementPostModal";
import UpdateAnnouncementPostModal from "./updateAnnouncementPostModal/UpdateAnnouncementPostModal";
import DeleteAnnouncementPostModal from "./deleteAnnouncementPostModal/DeleteRecruitmentPostModal";
import { NewsAndEventsPaths } from "../../../newsAndEvents/constants/constant.path";
import PaginationAntd from "../../../../components/paginationAntd/PaginationAntd";
import CustomBreadcrumb from "../../../../components/customBreadcrumb/CustomBreadcrumb";
import { managerPaths } from "../../constants/constant.path";

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

  const [queryParams, setQueryParams] = useState<CommonQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
    search: "",
  });
  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const fetchAnnouncementPosts = async () => {
    const res = await getAnnouncementPosts(queryParams);

    if (res) {
      const { data: announcementPostsApi, ...pageResponse } = res.data;
      console.log("announcementPostsApi:", announcementPostsApi);
      console.log("pageResponse:", pageResponse);

      setAnnouncementPosts(announcementPostsApi);
      setCustomPageParam(pageResponse);
    }
  };
  console.log("-------------");
  console.log("customPageParam:", customPageParam);
  console.log("queryParams:", queryParams);

  useEffect(() => {
    fetchAnnouncementPosts();
  }, [reset, queryParams]);

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

  const handleAccessAnnouncementPost = (
    announcementPost: AnnouncementPostDetail
  ) => {
    navigate(
      `${NewsAndEventsPaths.NEWS}${announcementPost.announcementPostId}`
    );
  };

  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.ANNOUNCEMENT_MANAGEMENT}`}>
                  {t("content.feature.AnnouncementManagement")}
                </a>
              </div>
            ),
          },
        ]}
        buttonGroup={
          <Button className="btn-create" onClick={handleCreateRecruitmentPost}>
            {t("content.announcementPost.AddPost")}
          </Button>
        }
      />

      <Card
        id="announcement-posts"
        title={t("content.announcementPost.AnnouncementManagementTitle")}
      >
        <Flex vertical gap={12}>
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
                      handleAccessAnnouncementPost={
                        handleAccessAnnouncementPost
                      }
                    />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </Flex>
          {customPageParam.total ? (
            <PaginationAntd
              total={customPageParam.total}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
            />
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
