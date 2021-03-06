import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      position: "absolute",
      margin: "auto",
      width: "80%",
      bottom: "10%",
    },
  })
);

export default useStyles;
