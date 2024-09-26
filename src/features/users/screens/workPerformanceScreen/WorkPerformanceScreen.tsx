import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { Flex } from "antd";
import BarChar from "./BarChart";
import { useAppSelector } from "../../../../app/hooks";
import { Evaluate } from "../../../../common/common.type";
import { INIT_EVALUATE } from "../../../../common/common.constant";
import { getEvaluates } from "../../../../api/apiServices";
import { toPascalCase } from "../../../../common/common.helper";

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
      console.log("newEvaluate:", newEvaluate);
      labels = Object.keys(newEvaluate);
      return {
        data: Object.values(newEvaluate),
        time: createdAt,
      };
    });
    return {
      userDataSets,
      labels: labels.map((lable) => toPascalCase(lable)),
    };
  }, [evaluates]);

  return (
    <Flex vertical>
      <BarChar
        customDataSets={userDataChart.userDataSets}
        labels={userDataChart.labels}
        // year={2023}
      />
    </Flex>
  );
};

export default WorkPerformanceScreen;
