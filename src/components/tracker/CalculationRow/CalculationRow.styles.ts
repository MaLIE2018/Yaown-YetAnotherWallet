import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    "& root:first-child": {
      display: "flex",
      flexDirection: "column",
    },
  },
  draggable: {
    width: "50%",
    height: "100%",
    position: "absolute",
    backgroundColor: theme.palette.grey[300],
    opacity: 0,
    zIndex: 1050,
  },
  calcRow: {
    width: "100%",
    height: "20%",
    backgroundColor: theme.palette.grey[50],
    position: "absolute",
    left: 0,
    bottom: "8%",
  },
  amount: {
    display: "flex",
    flexDirection: "row",
    "& button": {
      position: "absolute",
      right: 0,
      transform: "translateY(10px)",
    },
  },
}));

export default useStyles;
