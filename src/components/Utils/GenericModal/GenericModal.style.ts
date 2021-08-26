import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {},
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
