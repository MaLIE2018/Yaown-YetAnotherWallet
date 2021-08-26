import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    categoryList: {
      height: "300px",
      overflowY: "auto",
    },
  })
);

export default useStyles;
