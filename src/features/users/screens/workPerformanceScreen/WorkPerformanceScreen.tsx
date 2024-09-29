import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { Flex } from "antd";
import BarChart from "./BarChart";
import { useAppSelector } from "../../../../app/hooks";
import { Evaluate } from "../../../../common/common.type";
import { INIT_EVALUATE } from "../../../../common/common.constant";
import { getEvaluates } from "../../../../api/apiServices";
import {
  getDataSetsByYear,
  toPascalCase,
} from "../../../../common/common.helper";
import dayjs from "dayjs";

export const WorkPerformanceScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);
  const [evaluates, setEvaluates] = useState<Evaluate[]>([INIT_EVALUATE]);

  useEffect(() => {
    fetchEvaluates();
  }, []);
  const fetchEvaluates = async () => {
    const res = await getEvaluates();
    if (res.status === 200) {
      const evaluatesData = res.data.data as Evaluate[];
      let userEvaluates = evaluatesData.filter((evaluateData) => {
        return evaluateData.userId === currentAccount.userId;
      });

      setEvaluates(userEvaluates);
    }
  };

  const userDataChart = useMemo(() => {
    var labels: string[] = [];
    let userDataSets = evaluates.map((evaluate) => {
      const {
        evaluateId,
        userId,
        createdAt,
        updatedAt,
        averageScore,
        ...newEvaluate
      } = evaluate;
      labels = Object.keys(newEvaluate);

      return {
        data: Object.values(newEvaluate),
        time: createdAt,
      };
    });
    // sort dataset by time of field time (Date)
    const newUserDataSets = userDataSets.sort((a, b) => {
      return dayjs(a.time).isBefore(b.time) ? -1 : 1;
    });

    return {
      userDataSets: getDataSetsByYear(newUserDataSets),
      labels: labels.map((lable) => toPascalCase(lable)),
    };
  }, [evaluates]);

  const listBarChart = useMemo(() => {
    return userDataChart.userDataSets.map((userDataSet) => {
      return (
        <BarChart
          customDataSets={[userDataSet]}
          labels={userDataChart.labels}
          // year={2023}
        />
      );
    });
  }, [userDataChart]);
  return (
    <Flex vertical>
      {userDataChart.userDataSets.length === 0 ? (
        <div>Chưa có đánh giá nào</div>
      ) : userDataChart.userDataSets.length === 1 ? (
        listBarChart
      ) : (
        <>
          {listBarChart}
          <BarChart
            customDataSets={userDataChart.userDataSets}
            labels={userDataChart.labels}
            // year={2023}
          />
        </>
      )}
    </Flex>
  );
};

export default WorkPerformanceScreen;
