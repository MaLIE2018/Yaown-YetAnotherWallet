import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./TopNav.styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/types/types";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { RouteComponentProps, withRouter } from "react-router-dom";

const TopNav: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const classes = useStyles();
  const { page } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();

  return (
    <div className={classes.topNav}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          {page.present !== "cash" && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              onClick={() => {
                history.goBack();
                dispatch({ type: "NAVIGATION_BACK" });
              }}
              aria-label='back'>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Typography variant='h6' color='inherit'>
            {page.present.slice(0, 1).toUpperCase() + page.present.slice(1)}
          </Typography>
          {page.present === "wealth" && (
            <IconButton
              className={classes.addBtn}
              onClick={() => dispatch({ type: "TOGGLE_ADD_ASSET_MODAL" })}>
              <AddIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(TopNav);
