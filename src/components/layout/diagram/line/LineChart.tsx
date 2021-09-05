import React from "react";
import useStyles from "./Line.styles";
import Chart from "react-apexcharts";
import { Box } from "@material-ui/core";
import { getDaysInMonth, format } from "date-fns";

interface Props {
  interval: string;
  items: any[];
}

const LineChart: React.FC<Props> = ({ interval, items }) => {
  const classes = useStyles();
  let categories: string[] | number[] = [];
  let data: number[] = [];
  if (interval === "Annually") {
    categories = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    data = Array.from({ length: 12 }, () => 0);
    items.forEach((item, i) => {
      data.splice(item._id - 1, 1, item.total);
    });
  } else {
    if (items?.length > 0 && items[0] !== undefined) {
      categories = Array.from(
        { length: getDaysInMonth(items[0]._id) },
        (_, i) => i + 1
      );
    }
    data = Array.from({ length: getDaysInMonth(items[0]._id) }, () => 0);
    items.forEach((item, i) => {
      data.splice(
        Number(format(new Date(item._id), "d")),
        1,
        item.total < 0 ? -item.total : item.total
      );
    });
  }

  const options = {
    options: {
      dataLabels: { enabled: false },
      legend: {
        show: false,
      },
      chart: {
        id: "bar",
      },
      xaxis: {
        categories: categories,
      },
    },
    series: [
      {
        name: "test",
        data: data,
      },
    ],
  };

  return (
    <Box display='flex' justifyContent='center'>
      <Chart
        options={options.options}
        series={options.series}
        type='bar'
        width='100%'
      />
    </Box>
  );
};

export default LineChart;
