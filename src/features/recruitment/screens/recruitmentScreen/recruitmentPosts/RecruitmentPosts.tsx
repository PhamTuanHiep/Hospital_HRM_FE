import { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
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
import RecruitmentPoster from "../../../../manager/screens/recruitmentManagementScreen/recruitmentPoster/RecruitmentPoster";
import PaginationAntd from "../../../../../components/paginationAntd/PaginationAntd";

const RecruitmentPosts = () => {
  const navigate = useNavigate();

  const [recruitmentPosts, setRecruitmentPosts] = useState<
    RecruitmentPostDetail[]
  >([INIT_RECRUITMENT_POST_DETAIL]);
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
  }, [queryParams]);

  const handleAccessRecruitmentPost = (
    recruitmentPost: RecruitmentPostDetail
  ) => {
    navigate(`${recruitmentPost.recruitmentPostId}`);
  };
  return (
    <div>
      <Card>
        <Flex vertical gap={12}>
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
    </div>
  );
};
export default RecruitmentPosts;
