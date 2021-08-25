import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowY: "auto",
      "& .MuiTypography-root": {
        textAlign: "end",
      },
    },
  })
);

export default useStyles;
