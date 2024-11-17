import { useEffect, useMemo, useState } from "react";
import { getMedicalTrainingResults } from "../../../../api/apiServices";
import RadarChart from "./RadarChart";
import { useAppSelector } from "../../../../app/hooks";
import { MedicalTrainingResultsDetail } from "../../../../common/common.type";
import { INIT_MEDICAL_TRAINING_RESULTS } from "../../../../common/common.constant";
import dayjs from "dayjs";
import CommonBarChart from "./CommonBarChart";
import "./TrainingResultsScreen.scss";
import { Button, Card, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined, ScheduleOutlined } from "@ant-design/icons";

const TrainingResultsScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);

  const [year, setYear] = useState<number>(dayjs().year());

  const [medicalTrainingResults, setMedicalTrainingResults] = useState<
    MedicalTrainingResultsDetail[]
  >([INIT_MEDICAL_TRAINING_RESULTS]);

  useEffect(() => {
    fetchMedicalTrainingResults();
  }, [currentAccount]);

  const fetchMedicalTrainingResults = async () => {
    const res = await getMedicalTrainingResults();
    if (res) {
      const medicalTrainingResultsData = res.data
        .data as MedicalTrainingResultsDetail[];
      let yoursMedicalTrainingResults = medicalTrainingResultsData.filter(
        (medicalTrainingResult) => {
          return (
            medicalTrainingResult.user?.userId === currentAccount.user?.userId
          );
          return;
        }
      );
      setMedicalTrainingResults(yoursMedicalTrainingResults);
    }
  };

  const dataRadarChart = useMemo(() => {
    var labelsData: string[] = [];

    let dataSets = medicalTrainingResults.map((medicalTrainingResult) => {
      const {
        trainingResultsId,
        user,
        averageScore,
        createdAt,
        updatedAt,
        ...restMedicalTrainingResult
      } = medicalTrainingResult;
      labelsData = Object.keys(restMedicalTrainingResult);
      return {
        data: Object.values(restMedicalTrainingResult),
        time: createdAt,
      };
    });
    const newDataSets = dataSets.sort((a, b) => {
      return dayjs(a.time).isBefore(b.time) ? -1 : 1;
    });

    return {
      labels: labelsData,
      customDataSets: newDataSets,
    };
  }, [medicalTrainingResults]);

  const listChart = useMemo(() => {
    const oneDataChart = dataRadarChart.customDataSets.find((customDataSet) => {
      return dayjs(customDataSet.time).year() == year;
    });

    return (
      <Card>
        {oneDataChart ? (
          <div className="evaluate-items">
            <CommonBarChart
              customDataSets={[oneDataChart]}
              labels={dataRadarChart.labels}
              className="evaluate-item common-bar-chart"
            />
            <RadarChart
              customDataSets={[oneDataChart]}
              labels={dataRadarChart.labels}
              className="evaluate-item radar-chart"
            />
          </div>
        ) : (
          <div>Chưa có thông tin đánh giá kết quả đào tạo</div>
        )}
      </Card>
    );
  }, [dataRadarChart, year]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setYear(dayjs().year() + 1 - +e.key);
  };

  const nowYear = dayjs().year();
  const items: MenuProps["items"] = [
    {
      label: <div>{nowYear}</div>,
      key: "1",
      icon: <ScheduleOutlined />,
    },
    {
      label: <div>{nowYear - 1}</div>,
      key: "2",
      icon: <ScheduleOutlined />,
    },
    {
      label: <div>{nowYear - 2}</div>,
      key: "3",
      icon: <ScheduleOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div>
      <h1>Kết quả đào tạo </h1>
      <Dropdown menu={menuProps} className="dropdown-year">
        <Button className="btn-year">
          <Space>
            Năm {year}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      {listChart}
    </div>
  );
};
export default TrainingResultsScreen;
