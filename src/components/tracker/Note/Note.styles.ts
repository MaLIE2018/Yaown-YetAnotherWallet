import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
