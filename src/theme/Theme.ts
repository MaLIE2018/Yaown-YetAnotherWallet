import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    secondary: {
      main: "#7e57c2",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        ".MuiButton-root": {
          textTransform: "capitalize",
        },
        ".MuiIconButton-root": {
          color: "#fff",
        },
      },
    },
  },
});
