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
  now?: boolean;
  year?: number;
}
const BarChart = ({
  customDataSets,
  labels,
  now = true,
  year,
}: BarCharProps) => {
  const backgroundColors: string[] = [
    "#609ddd",
    "#a4bf80",
    "#f5d36e",
    "#e2918e",
  ];
  const newCustomDataSet = getDataSetsByYear(customDataSets, now, year);

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
    datasets: dataSets.sort((a, b) => a.label.localeCompare(b.label)),
  };

  return (
    <Chart
      type="bar"
      data={charData}
      options={{
        plugins: {
          legend: { display: true },

          title: {
            display: true,
            text: "Predicted world population (millions) in 2050",
          },
        },
      }}
    />
  );
};
export default BarChart;
