import dayjs from "dayjs";
import { Chart } from "react-chartjs-2";
import { convertToPercentage } from "../../../../common/common.helper";

interface CustomDataSets {
  data: number[];
  time?: Date;
}
interface RadarChartProps {
  customDataSets: CustomDataSets[];
  labels: string[];
  className?: string;
}
const RadarChart = ({ customDataSets, labels, className }: RadarChartProps) => {
  // const data = {
  //   labels: [
  //     "Eating",
  //     "Drinking",
  //     "Sleeping",
  //     "Designing",
  //     "Coding",
  //     "Cycling",
  //     "Running",
  //   ],
  //   datasets: [
  //     {
  //       label: "My Second Dataset",
  //       data: [28, 48, 40, 19, 96, 27, 100],
  //       fill: true,
  //       backgroundColor: "rgba(54, 162, 235, 0.2)",
  //       borderColor: "rgb(54, 162, 235)",
  //       pointBackgroundColor: "rgb(54, 162, 235)",
  //       pointBorderColor: "#fff",
  //       pointHoverBackgroundColor: "#fff",
  //       pointHoverBorderColor: "rgb(54, 162, 235)",
  //     },
  //   ],
  // };

  // const data2 = {
  //   labels: [
  //     "Eating",
  //     "Drinking",
  //     "Sleeping",
  //     "Designing",
  //     "Coding",
  //     "Cycling",
  //     "Running",
  //   ],
  //   datasets: [
  //     {
  //       label: "My Second Dataset",
  //       data: convertToPercentage([5, 1, 1, 1, 1, 1, 1]),
  //       fill: true,
  //       backgroundColor: "rgba(54, 162, 235, 0.2)",
  //       borderColor: "rgb(54, 162, 235)",
  //       pointBackgroundColor: "rgb(54, 162, 235)",
  //       pointBorderColor: "#fff",
  //       pointHoverBackgroundColor: "#fff",
  //       pointHoverBorderColor: "rgb(54, 162, 235)",
  //     },
  //   ],
  // };

  const data = customDataSets.map((customDataSet) => {
    return {
      labels,
      datasets: [
        {
          label: `Biểu đồ đánh giá chất lượng đào tạo năm  ${dayjs(
            customDataSet.time
          ).year()} theo phần trăm`,
          data: convertToPercentage(customDataSet.data),
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
      ],
    };
  });
  console.log("customDataSets:", customDataSets);

  // console.log("data:", data);
  return (
    <>
      {data.map((datum) => {
        return (
          <Chart
            className={className}
            type="radar"
            data={datum}
            options={{
              elements: {
                line: {
                  borderWidth: 3,
                },
              },
            }}
          />
        );
      })}

      {/* <Chart
        type="radar"
        data={data}
        options={{
          elements: {
            line: {
              borderWidth: 3,
            },
          },
        }}
      />  */}
    </>
  );
};
export default RadarChart;
