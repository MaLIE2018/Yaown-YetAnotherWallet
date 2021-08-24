import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: theme.palette.background.paper,
      height: "50%",
      width: "90%",
      left: "5%",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 2),
      overflowY: "auto",
    },
  })
);

export default useStyles;
