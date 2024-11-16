import { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { getAnnouncementPosts } from "../../../../../api/apiServices";
import { AnnouncementPostDetail } from "../../../../../common/common.type";
import { INIT_ANNOUNCEMENT_POST_DETAIL } from "../../../../../common/common.constant";
import AnnouncementPosterScreen from "../../../../manager/screens/announcementManagementScreen/announcementPoster/AnnouncementPosterScreen";

const AnnouncementPosts = () => {
  const navigate = useNavigate();

  const [announcementPosts, setAnnouncementPosts] = useState<
    AnnouncementPostDetail[]
  >([INIT_ANNOUNCEMENT_POST_DETAIL]);

  const fetchAnnouncementPosts = async () => {
    const res = await getAnnouncementPosts();
    if (res) {
      setAnnouncementPosts(res.data.data);
    }
  };

  useEffect(() => {
    fetchAnnouncementPosts();
  }, []);

  const handleAccessAnnouncementPost = (
    announcementPost: AnnouncementPostDetail
  ) => {
    navigate(`${announcementPost.announcementPostId}`);
  };
  return (
    <div>
      <Card>
        <Flex vertical gap={8}>
          {announcementPosts ? (
            announcementPosts.map((announcementPost, index) => {
              return (
                <div key={index}>
                  <AnnouncementPosterScreen
                    announcementPost={announcementPost}
                    handleAccessAnnouncementPost={handleAccessAnnouncementPost}
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
export default AnnouncementPosts;
