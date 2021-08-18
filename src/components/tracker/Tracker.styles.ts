import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "50%",
    position: "absolute",
    bottom: 0,
    background: "rgba(0,0,1)",
    margin: 0,
    zIndex: (show) => {
      return show ? 1050 : -1000;
    },
    opacity: (show) => {
      return show ? 1 : 0;
    },
  },
});

export default useStyles;
