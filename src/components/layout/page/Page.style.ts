import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      backgroundColor: theme.palette.primary.main,
      zIndex: 1050,
      overflow: "",
    },
  })
);
