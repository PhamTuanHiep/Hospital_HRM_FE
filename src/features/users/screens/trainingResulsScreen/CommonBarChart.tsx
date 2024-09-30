import dayjs from "dayjs";
import { Chart } from "react-chartjs-2";

interface CustomDataSets {
  data: number[];
  time?: Date;
}
interface CommonBarChartProps {
  customDataSets: CustomDataSets[];
  labels: string[];
  className?: string;
}
const CommonBarChart = ({
  customDataSets,
  labels,
  className,
}: CommonBarChartProps) => {
  const data = customDataSets.map((customDataSet) => {
    return {
      labels,
      datasets: [
        {
          label: `Điểm đánh giá giá chất lượng đào tạo năm  ${dayjs(
            customDataSet.time
          ).year()}`,
          data: customDataSet.data,
          backgroundColor: "#609ddd",
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
            type="bar"
            data={datum}
            options={{
              plugins: {
                legend: { display: true },

                title: {
                  display: true,
                  text: `Biểu đồ đánh giá chất lượng đào tạo năm  ${dayjs(
                    customDataSets[0].time
                  ).year()}`,
                },
              },
            }}
          />
        );
      })}
    </>
  );
};
export default CommonBarChart;
