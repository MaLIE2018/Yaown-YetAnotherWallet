import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      [theme.breakpoints.up("sm")]: { width: "375PX" },
      [theme.breakpoints.down("sm")]: { width: "100vw" },

      "& form": {
        display: "flex",
        width: "90vw",
        flexDirection: "column",
        alignItems: "center",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "100%",
    },
  })
);

export default useStyles;
