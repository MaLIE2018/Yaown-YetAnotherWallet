import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "50%",
    position: "absolute",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    bottom: "0",
    background: "rgba(0,0,1)",
    margin: 0,
    zIndex: (showTracker) => {
      return showTracker ? 1050 : -1000;
    },
    opacity: (showTracker) => {
      return showTracker ? 1 : 0;
    },
  },
});

export default useStyles;
