import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  future: {
    flexGrow: 1,
    overflow: "auto",
    "& .MuiListItem-root": {
      padding: 0,

      display: "flex",
      justifyContent: "space-between",
      "& .MuiTypography-root": {
        width: "60%",
      },
      "& .MuiFormControl-root": {
        width: "40%",
      },
    },
  },
});

export default useStyles;
