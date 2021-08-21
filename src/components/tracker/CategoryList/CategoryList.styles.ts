import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      height: "50%",
      width: "90%",
      left: "5%",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflowY: "auto",
    },
  })
);

export default useStyles;
