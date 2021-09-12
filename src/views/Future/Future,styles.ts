import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  future: {
    flexGrow: 1,
    "& .MuiListItem-root": {
      padding: 0,
      display: "flex",
      justifyContent: "space-between",
      "& .MuiTypography-root": {
        width: "70%",
      },
      "& .MuiFormControl-root": {
        width: "30%",
      },
    },
  },
});

export default useStyles;
