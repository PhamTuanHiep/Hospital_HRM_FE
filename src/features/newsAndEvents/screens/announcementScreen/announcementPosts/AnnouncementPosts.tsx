import { useEffect, useState } from "react";
import { Card, Flex, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { getAnnouncementPosts } from "../../../../../api/apiServices";
import {
  AnnouncementPostDetail,
  CommonQueryParams,
  PageResponse,
} from "../../../../../common/common.type";
import {
  INIT_ANNOUNCEMENT_POST_DETAIL,
  INIT_PAGE_RESPONSE,
  QueryParamsWithListPosts,
} from "../../../../../common/common.constant";
import AnnouncementPosterScreen from "../../../../manager/screens/announcementManagementScreen/announcementPoster/AnnouncementPosterScreen";
import PaginationAntd from "../../../../../components/paginationAntd/PaginationAntd";

const AnnouncementPosts = () => {
  const navigate = useNavigate();

  const [announcementPosts, setAnnouncementPosts] = useState<
    AnnouncementPostDetail[]
  >([INIT_ANNOUNCEMENT_POST_DETAIL]);

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
      setAnnouncementPosts(announcementPostsApi);
      setCustomPageParam(pageResponse);
    }
  };

  useEffect(() => {
    fetchAnnouncementPosts();
  }, [queryParams]);

  const handleAccessAnnouncementPost = (
    announcementPost: AnnouncementPostDetail
  ) => {
    navigate(`${announcementPost.announcementPostId}`);
  };

  return (
    <div>
      <Card>
        <Flex vertical gap={12}>
          <Flex vertical gap={8}>
            {announcementPosts ? (
              announcementPosts.map((announcementPost, index) => {
                return (
                  <div key={index}>
                    <AnnouncementPosterScreen
                      announcementPost={announcementPost}
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
              defaultCurrent={queryParams.page}
              total={customPageParam.total}
              pageSize={queryParams.items_per_page}
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
export default AnnouncementPosts;
