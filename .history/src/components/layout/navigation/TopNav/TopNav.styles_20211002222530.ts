import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topNav: {},
    menuButton: {
      marginRight: theme.spacing(2),
    },
    addBtn: {
      marginLeft: "auto",
    },
    [refBtn]: {
      marginRight: "auto",
    },
  })
);
