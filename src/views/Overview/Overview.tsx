import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import React from "react";
import ByCategoryList from "./Lists/byCategory/ByCategoryList";
import useStyles from "./Overview.styles";
import { useDispatch } from "hooks/useDispatch";
import { PieChart } from "./../../components/layout/diagram/pie/PieChart";
import LineChart from "components/layout/diagram/line/LineChart";
import Filter from "./Filter/Filter";

const Overview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.overview}>
      <Filter />
      <GeneralBox
        title=''
        render={<div>Annual saving rate per year 500 $</div>}></GeneralBox>
      <GeneralBox title='By Category' render={<PieChart />}></GeneralBox>
      <GeneralBox title='By Date' render={<LineChart />}></GeneralBox>
      <GeneralBox title='All Category' render={<ByCategoryList />}></GeneralBox>
    </div>
  );
};

export default Overview;
