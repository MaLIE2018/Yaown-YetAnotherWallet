import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dateChooser: {
      "& .MuiButtonBase-root": { padding: 0 },
    },
  })
);

export default useStyles;
