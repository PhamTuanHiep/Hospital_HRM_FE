import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { Flex } from "antd";
import BarChar from "./BarChart";
import { useAppSelector } from "../../../../app/hooks";
import { Evaluate } from "../../../../common/common.type";
import { INIT_EVALUATE } from "../../../../common/common.constant";
import { getEvaluate, getEvaluates } from "../../../../api/apiServices";
import { toPascalCase } from "../../../../common/common.helper";

export const WorkPerformanceScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);
  const [evaluates, setEvaluates] = useState<Evaluate[]>([INIT_EVALUATE]);

  useEffect(() => {
    fetchEvaluates();
  }, []);
  const fetchEvaluates = async () => {
    const res = await getEvaluates();
    if (res.status == 200) {
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

  const data1 = [2, 3, 5, 1, 4, 3, 4, 2];
  const data2 = [3, 1, 4, 5, 4, 2, 3, 5];
  const data3 = [4, 5, 4, 2, 3, 5, 3, 1];
  const data4 = [1, 2, 1, 2, 3, 5, 3, 1];

  // const dataSets = [
  //   {
  //     // label: "Quy 1 ",
  //     // backgroundColor: ["#a4bf80"],
  //     data: data1,
  //     time: new Date("2023-04-26 09:28:50.174935"),
  //   },
  //   {
  //     // label: "Quy 2",
  //     // backgroundColor: ["#f5d36e"],
  //     data: data2,
  //     time: new Date("2023-08-26 09:28:50.174935"),
  //   },
  //   {
  //     // label: "Quy 3",
  //     // backgroundColor: ["#e2918e"],
  //     data: data3,
  //     time: new Date("2023-10-26 09:28:50.174935"),
  //   },
  //   {
  //     // label: "Quy 4",
  //     // backgroundColor: ["#609ddd"],
  //     data: data4,
  //     time: new Date("2024-1-26 09:28:50.174935"),
  //   },
  //   // {
  //   //   label: "Average Line", // Đường trung bình
  //   //   data: [3, 3, 3, 3, 3, 3, 3, 3], // Sử dụng giá trị trung bình
  //   //   type: "line" as ChartType, // Đặt type là 'line' để thêm đường
  //   //   borderColor: "#77848f",
  //   //   borderWidth: 2,
  //   //   pointRadius: 0, // Không hiển thị các điểm trên đường
  //   // },
  // ];

  return (
    <Flex vertical>
      {/* <Line ref={ref} data={data} /> */}
      <BarChar
        customDataSets={userDataChart.userDataSets}
        labels={userDataChart.labels}

        // year={2023}
      />
    </Flex>
  );
};

export default WorkPerformanceScreen;
