import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
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
