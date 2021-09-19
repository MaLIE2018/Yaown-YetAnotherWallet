import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAccount: {
      height: "90vh",
      [theme.breakpoints.up("sm")]: {
        width: "375PX",
        height: "920PX",
        margin: "0 auto",
      },
    },
    formControl: {
      width: "90%",
    },
  })
);

export default useStyles;
