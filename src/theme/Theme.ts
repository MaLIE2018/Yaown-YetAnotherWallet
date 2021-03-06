import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#eeeeee",
      light: "#ffffff",
      dark: "#bcbcbc",
    },
    secondary: {
      main: "#ffa726",
      light: "#ffd95b",
      dark: "#c77800",
    },
  },
  shape: {
    borderRadius: 8,
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
        ".MuiIconButton-root": {},
        ".MuiBottomNavigationAction-root.Mui-selected": {
          color: "#ffa726",
        },
      },
    },
  },
});
