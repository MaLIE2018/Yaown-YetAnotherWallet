import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import React from "react";
import ByCategoryList from "./Lists/byCategory/ByCategoryList";
import useStyles from "./Overview.styles";

const Overview = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GeneralBox title='All Category' render={<ByCategoryList />}></GeneralBox>
    </div>
  );
};

export default Overview;
