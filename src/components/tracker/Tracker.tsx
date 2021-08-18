import React from "react";
import useStyles from "./Tracker.styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface TrackerProps {
  show: boolean;
  setVisibility: Function;
}

const Tracker: React.FC<TrackerProps> = ({
  show,
  setVisibility,
}: TrackerProps) => {
  const classes = useStyles(show);
  return <div className={classes.root}></div>;
};

export default Tracker;
