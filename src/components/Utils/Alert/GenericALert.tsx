import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import { useDispatch } from "react-redux";
import { AlertVariants } from "types/types";
import useStyles from "./GenericAlert.style";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

interface Props {
  show: boolean;
  variant: AlertVariants;
  text: string;
}

const GenericAlert: React.FC<Props> = ({ show, variant, text }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: "TOGGLE_TRANSACTION_ALERT",
      payload: {
        variant: AlertVariants.success,
        text: "",
        show: false,
      },
    });
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={1500}
      onClose={handleClose}
      className={classes.root}>
      <Alert onClose={handleClose} severity={`${variant}`}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default GenericAlert;