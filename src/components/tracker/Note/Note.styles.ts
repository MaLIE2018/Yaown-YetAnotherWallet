import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: theme.palette.background.paper,
    width: "90%",
    left: "5%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 2, 1),
    display: "flex",
    flexDirection: "column",
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
