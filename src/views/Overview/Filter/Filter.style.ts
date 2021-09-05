import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dateChooser: {
      "& .MuiButtonBase-root": { padding: 0 },
    },
    filterDatePicker: {
      "& input": {
        textAlign: "center",
        padding: 0,
      },
      "& input::before": {
        borderBottom: 0,
      },
      "& .MuiInput-underline:before": {
        borderBottom: 0,
        transition: "borderBottom-color",
      },
      "& .MuiInput-underline:after": {
        borderBottom: 0,
        transition: "borderBottom-color",
      },
    },
  })
);

export default useStyles;
