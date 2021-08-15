import React from "react";
import useStyles from "./PieChart.styles";
import Chart from "react-apexcharts";

export const PieChart: React.FC<{}> = () => {
  const classes = useStyles();

  const options = {
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type='donut'
      width='75%'
    />
  );
};
