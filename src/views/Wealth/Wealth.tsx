import React from "react";
import { PieChart } from "../../components/layout/diagram/pie/PieChart";
import useStyles from "./Wealth.styles";

const Wealth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PieChart />
    </div>
  );
};

export default Wealth;
