import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "50%",
    position: "absolute",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#f5f5f5",
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
      borderRadius: "16px",
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
      justifyContent: "flex-end",
    },
  },
});

export default useStyles;
