import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      width: "90%",
      margin: "5%",
      background: theme.palette.primary.light,
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;
