import { useEffect, useMemo, useState } from "react";
import { getMedicalTrainingResults } from "../../../../api/apiServices";
import RadarChart from "./RadarChart";
import { useAppSelector } from "../../../../app/hooks";
import { MedicalTrainingResults } from "../../../../common/common.type";
import { INIT_MEDICAL_TRAINING_RESULTS } from "../../../../common/common.constant";
import dayjs from "dayjs";
import CommonBarChart from "./CommonBarChart";
import "./TrainingResulsScreen.scss";
import { Card } from "antd";

const TrainingResulsScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);

  const [medicalTrainingResults, setMedicalTrainingResults] = useState<
    MedicalTrainingResults[]
  >([INIT_MEDICAL_TRAINING_RESULTS]);
  useEffect(() => {
    fetchMedicalTrainingResults();
  }, [currentAccount]);

  const fetchMedicalTrainingResults = async () => {
    const res = await getMedicalTrainingResults();
    if (res) {
      const medicalTrainingResultsData = res.data.data;
      console.log("res.data.ta:", medicalTrainingResultsData);
      setMedicalTrainingResults(medicalTrainingResultsData);
    }
  };
  const dataRadarChart = useMemo(() => {
    var labelsData: string[] = [];

    let dataSets = medicalTrainingResults.map((medicalTrainingResult) => {
      const {
        trainingResultsId,
        userId,
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
    return dataRadarChart.customDataSets.map((customDataSet) => {
      return (
        <Card>
          <div className="evaluate-items">
            <CommonBarChart
              customDataSets={[customDataSet]}
              labels={dataRadarChart.labels}
              className="evaluate-item common-bar-chart"
            />
            <RadarChart
              customDataSets={[customDataSet]}
              labels={dataRadarChart.labels}
              className="evaluate-item radar-chart"
            />
          </div>
        </Card>
      );
    });
  }, [dataRadarChart]);

  console.log("dataRadarChart:", dataRadarChart);
  return (
    <div>
      <h1>TrainingResulsScreen</h1>
      {listChart}
      {/* <RadarChart
        customDataSets={dataRadarChart.customDataSets}
        labels={dataRadarChart.labels}
      /> */}
    </div>
  );
};
export default TrainingResulsScreen;
