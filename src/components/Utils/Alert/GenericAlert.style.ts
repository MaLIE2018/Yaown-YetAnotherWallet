import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      margin: "0 auto",
      width: "80%",
    },
  })
);

export default useStyles;
