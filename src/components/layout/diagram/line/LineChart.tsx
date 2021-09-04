import React from "react";
import useStyles from "./Line.styles";
import Chart from "react-apexcharts";
import { Box } from "@material-ui/core";

const LineChart: React.FC<{}> = () => {
  const classes = useStyles();

  const options = {
    options: {
      dataLabels: { enabled: false },
      legend: {
        show: false,
      },
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [13, 14, 15, 16, 17, 18, 19, 20, 21],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <Box display='flex' justifyContent='center'>
      <Chart
        options={options.options}
        series={options.series}
        type='bar'
        width='75%'
      />
    </Box>
  );
};

export default LineChart;
