import { makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      overflow: "auto",

      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(13),
        height: theme.spacing(13),
      },
      "& button": {
        width: "100%",
        height: "100%",
        "& span": {
          wordWrap: "break-word",
        },
      },
      "&::before": {
        content: '""',
        position: "absolute",
        opacity: (showTracker) => (showTracker ? 1 : 0),
        bottom: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
      },
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
