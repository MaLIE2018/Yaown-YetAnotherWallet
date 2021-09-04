import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  overview: {
    flexGrow: 1,
    overflowY: "auto",
  },
  dateChooser: {
    "& .MuiButtonBase-root": { padding: 0 },
  },
});

export default useStyles;
