import { makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cash: {
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      overflow: "auto",
      flexGrow: 1,
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
        background: theme.palette.grey[600],
      },
      "& .MuiButton-label": {
        display: "flex",
        flexDirection: "column",
        "& .MuiSvgIcon-root": {
          position: "absolute",
          top: "10%",
        },
      },
    },
    text: {
      position: "absolute",
      bottom: "-45%",
      height: "100%",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    divider: {
      width: "90%",
      height: "2px",
      borderRadius: "1px",
      marginBottom: "15px",
    },
  })
);
