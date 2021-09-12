import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      height: "100vh",
      [theme.breakpoints.up("sm")]: {
        width: "375PX",
        height: "920PX",
        margin: "0 auto",
        marginTop: "calc((100vh - 920px)/2)",
      },
      [theme.breakpoints.down("sm")]: { width: "100vw" },
      backgroundColor: "#eeeeee",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      "& ::-webkit-scrollbar": {
        width: 0 /* Remove scrollbar space */,
        background: "transparent" /* Optional: just make scrollbar invisible */,
      },
    },
  })
);

export default useStyles;
