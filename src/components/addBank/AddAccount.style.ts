import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAccount: {},
    formControl: {
      margin: theme.spacing(8),
      minWidth: 200,
    },
  })
);

export default useStyles;
