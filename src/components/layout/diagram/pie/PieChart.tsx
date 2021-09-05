import React from "react";
import useStyles from "./PieChart.styles";
import Chart from "react-apexcharts";
import { Box } from "@material-ui/core";

interface Props {
  series: number[];
  labels: string[];
}

export const PieChart: React.FC<Props> = ({ series, labels }) => {
  const classes = useStyles();
  const options = {
    options: {
      dataLabels: { enabled: false },
      legend: {
        show: false,
      },
      labels: labels,
    },
    series: series,
  };

  return (
    <Box display='flex' justifyContent='center'>
      <Chart
        options={options.options}
        series={options.series}
        type='donut'
        width='100%'
      />
    </Box>
  );
};
