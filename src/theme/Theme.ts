import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  yaown: {
    main: "#5A37C3",
  },
  palette: {
    secondary: {
      main: "#7e57c2",
    },
  },
  shape: {
    borderRadius: 16,
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
