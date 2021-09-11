import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    genericListItem: {
      padding: theme.spacing(1, 1, 0),
    },
    iconButton: {
      paddingRight: 0,
    },
  })
);

export default useStyles;
