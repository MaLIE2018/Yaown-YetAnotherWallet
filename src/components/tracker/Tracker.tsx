import React from "react";
import useStyles from "./Tracker.styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/types/types";

const Tracker: React.FC<{}> = () => {
  const { showTracker } = useSelector((state: IRootState) => state);
  const classes = useStyles(showTracker);
  return <div className={classes.root}></div>;
};

export default Tracker;
{
  /* <ClickAwayListener onClickAway={() => setVisibility(false)}></ClickAwayListener> */
}
