import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tracker: {
    width: "100%",
    height: "50%",
    position: "absolute",
    borderTopLeftRadius: theme.shape.borderRadius * 2,
    borderTopRightRadius: theme.shape.borderRadius * 2,

    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: theme.palette.primary.main,
    margin: 0,
    zIndex: (showTracker) => {
      return showTracker ? 1050 : -1000;
    },
    opacity: (showTracker) => {
      return showTracker ? 1 : 0;
    },
  },
  calculationRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      alignSelf: "flex-end",
    },
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    "& :first-child": {
      borderRadius: theme.shape.borderRadius,
    },
    "& .MuiInput-underline:before": {
      content: '""',
      borderBottom: "0px",
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: 0,
      marginBottom: 0,
    },
    "& .MuiInputBase-root": {
      marginRight: "-3px",
      justifyContent: "flex-end",
    },
  },
}));

export default useStyles;
