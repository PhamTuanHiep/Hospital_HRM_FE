import { ChartType } from "chart.js";

import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import {
  getDataSetsByYear,
  getQuarterLabels,
} from "../../../../common/common.helper";
import dayjs from "dayjs";
import { CustomDataSets } from "../../../../common/common.type";

interface BarCharProps {
  labels: string[];
  customDataSets: CustomDataSets[];
  year?: number;
}
const BarChart = ({ customDataSets, labels, year }: BarCharProps) => {
  const backgroundColors: string[] = [
    "#609ddd",
    "#a4bf80",
    "#f5d36e",
    "#e2918e",
  ];
  const newCustomDataSet = getDataSetsByYear(customDataSets, year);
  const dataSets = newCustomDataSet.map((customDataSet, index) => {
    let timeLabel = getQuarterLabels(customDataSet?.time);

    return {
      type: (customDataSet?.type || "bar") as ChartType,
      label: customDataSet.label || timeLabel || `Columns group ${index + 1}`,
      backgroundColor: customDataSet.backgroundColor ||
        backgroundColors[index] || ["#609ddd"],
      data: customDataSet.data,
    };
  });

  const charData = {
    labels: labels,
    //sort dataset by quarter of label field
    datasets: dataSets.sort((a, b) => a.label.localeCompare(b.label)),
  };

  console.log("charData.datasets:", charData.datasets);
  const nowYear = year || dayjs().year();
  return (
    <>
      {charData.datasets.length !== 0 ? (
        <Chart
          type="bar"
          data={charData}
          options={{
            plugins: {
              legend: { display: true },

              title: {
                display: true,
                text: `Biểu đồ đánh giá hiệu xuất làm công việc năm ${nowYear}`,
              },
            },
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default BarChart;
