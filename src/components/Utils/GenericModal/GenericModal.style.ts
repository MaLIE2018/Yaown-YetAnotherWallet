import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      [theme.breakpoints.up("sm")]: {
        width: "350PX",
        height: "920PX",
        margin: "0 auto",
        marginTop: "calc((100vh - 920px)/2)",
      },
    },
    content: {
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
      borderRadius: theme.shape.borderRadius,
    },
  })
);

export default useStyles;
