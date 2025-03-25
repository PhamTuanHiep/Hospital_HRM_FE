import { Button, Card, Flex } from "antd";
import { MouseEvent, useEffect, useState } from "react";
import { getRecruitmentPosts } from "../../../../../api/apiServices";
import {
  CommonQueryParams,
  PageResponse,
  RecruitmentPostDetail,
} from "../../../../../common/common.type";
import {
  INIT_PAGE_RESPONSE,
  INIT_RECRUITMENT_POST_DETAIL,
  QueryParamsWithListPosts,
} from "../../../../../common/common.constant";
import "./RecruitmentManagementScreen.scss";
import CreateRecruitmentPostModal from "./createRecruitmentPostModal/CreateRecruitmentPostModal";
import RecruitmentPoster from "./recruitmentPoster/RecruitmentPoster";
import UpdateRecruitmentPostModal from "./updateRecruitmentPostModal/UpdateRecruitmentPostModal";
import DeleteRecruitmentPostModal from "./deleteRecruitmentPostModal/DeleteRecruitmentPostModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { recruitmentPaths } from "../../../../recruitment/constants/constant.path";
import PaginationAntd from "../../../../../components/paginationAntd/PaginationAntd";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import {
  managerChildPaths,
  managerPaths,
} from "../../../constants/constant.path";

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

  const [queryParams, setQueryParams] = useState<CommonQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
    search: "",
  });
  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const fetchRecruitmentPosts = async () => {
    const res = await getRecruitmentPosts(queryParams);
    if (res) {
      const { data: recruitmentPostsApi, ...pageResponse } = res.data;
      setCustomPageParam(pageResponse);
      setRecruitmentPosts(recruitmentPostsApi);
    }
  };

  useEffect(() => {
    fetchRecruitmentPosts();
  }, [reset, queryParams]);

  const handleCreateRecruitmentPost = () => {
    setIsModalOpenCreate(true);
  };

  const navigateToTrainingScreen = () => {
    navigate(
      `${managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT}/${managerChildPaths.TRAINING_MANAGEMENT}`
    );
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
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT}`}>
                  {t("content.feature.RecruitmentManagement")}
                </a>
              </div>
            ),
          },
        ]}
        buttonGroup={
          <Flex gap={8}>
            <Button
              className="btn-create"
              onClick={handleCreateRecruitmentPost}
            >
              {t("content.recruitmentPost.AddPost")}
            </Button>
            <Button className="btn-create" onClick={navigateToTrainingScreen}>
              {t("content.recruitmentPost.RecruitmentManagement")}
            </Button>
          </Flex>
        }
      />
      <Card
        id="recruitment-posts"
        title={t("content.recruitmentPost.RecruitmentManagementTitle")}
      >
        <Flex vertical gap={12}>
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
