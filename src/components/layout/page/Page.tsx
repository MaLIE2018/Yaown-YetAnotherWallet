import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./Page.style";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
interface Props {
  render: React.ReactNode;
  togglePage: Function;
  title: string;
}

export const Page: React.FC<Props> = ({ render, togglePage, title }) => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            aria-label='back'
            color='inherit'
            onClick={() => togglePage()}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant='h6' color='inherit'>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {render}
    </Box>
  );
};
export default Page;
