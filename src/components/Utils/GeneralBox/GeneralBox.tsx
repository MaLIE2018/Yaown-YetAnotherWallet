import { Box, Typography } from "@material-ui/core";
import React from "react";
import { theme } from "theme/Theme";
import useStyles from "./GeneralBox.styles";

interface Props {
  render: React.ReactElement;
  title?: string;
}

const GeneralBox: React.FC<Props> = ({ render, title }) => {
  const classes = useStyles();
  return (
    <Box borderRadius={theme.shape.borderRadius} className={classes.box}>
      <Typography variant='h6'>{title}</Typography>
      {render}
    </Box>
  );
};

export default GeneralBox;
