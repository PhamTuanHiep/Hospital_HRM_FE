import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecruitmentPostDetail as RecruitmentPostTypeDetail } from "../../../../../common/common.type";
import { INIT_RECRUITMENT_POST_DETAIL } from "../../../../../common/common.constant";
import { getRecruitmentPost } from "../../../../../api/apiServices";
import { Card, Flex, Image, Typography } from "antd";
import "./RecruitmentPostDetail.scss";
import TextComponent from "../../../../../components/textComponent/TextComponent";
import { formatDateToDDMMYYYY } from "../../../../../common/common.helper";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;
const RecruitmentPostDetail = () => {
  const { t } = useTranslation();
  const { recruitmentPostId } = useParams<{ recruitmentPostId?: string }>();

  const [recruitmentPost, setRecruitmentPost] =
    useState<RecruitmentPostTypeDetail>(INIT_RECRUITMENT_POST_DETAIL);

  const fetchRecruitmentPost = async () => {
    const res = await getRecruitmentPost(Number(recruitmentPostId));
    console.log("res:", res);
    if (res) {
      setRecruitmentPost(res.data);
    }
  };

  useEffect(() => {
    fetchRecruitmentPost();
  }, []);
  console.log("recruitmentPostId:", recruitmentPostId);
  console.log("recruitmentPost:", recruitmentPost);

  return (
    <div id="card_recruitment-post-detail">
      <Card
        title={
          <Flex
            vertical
            align="flex-start"
            className="card_recruitment-detail-title"
          >
            <Typography>
              <Title level={4}> {recruitmentPost.title}</Title>
              <Title level={5}> {recruitmentPost.subtitle}</Title>
              <Flex justify="space-between">
                <Text>
                  {`${t("content.common.CreatedAt")}: ${formatDateToDDMMYYYY(
                    recruitmentPost.createdAt
                  )}`}
                </Text>
                <Text>{`${t("content.recruitmentPost.Author")}: ${
                  recruitmentPost.user?.fullName
                }`}</Text>
              </Flex>
            </Typography>
          </Flex>
        }
      >
        <Flex vertical>
          <Flex vertical align="center">
            {recruitmentPost.image ? (
              <Image
                preview={false}
                src={recruitmentPost.image}
                alt="ảnh bìa đăng tuyển"
              ></Image>
            ) : (
              <div></div>
            )}
          </Flex>

          <Flex vertical align="flex-start">
            <Typography>
              <Title className="section" level={3}>
                {t("content.recruitmentPost.GeneralRequirements")}:
              </Title>
              <TextComponent text={recruitmentPost.generalRequirements} />
            </Typography>
          </Flex>
          <Flex vertical align="flex-start">
            <Typography>
              <Title className="section" level={3}>
                {`${t("content.recruitmentPost.Benefits")}:`}
              </Title>
              <TextComponent text={recruitmentPost.benefits} />
            </Typography>
          </Flex>
          <Flex vertical align="flex-start">
            <Typography>
              <Title className="section" level={3}>
                {`${t("content.recruitmentPost.RequiredDocuments")}:`}
              </Title>
              <TextComponent text={recruitmentPost.requiredDocuments} />
            </Typography>
          </Flex>
          <Flex vertical align="flex-start">
            <Typography>
              <Title className="section" level={3}>
                {`${t("content.recruitmentPost.Contact")}:`}
              </Title>
              <TextComponent text={recruitmentPost.contact} />
            </Typography>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};
export default RecruitmentPostDetail;
