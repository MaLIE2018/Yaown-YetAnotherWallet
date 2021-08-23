import { Box, Button, Fab } from "@material-ui/core";
import React from "react";
// import useStyles from "./Calculator.styles";
import Typography from "@material-ui/core/Typography";
import trackerIcons from "../../icons/trackerIcons";
import CalculatorApi from "../../../services/calculator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IRootState } from "store/types/types";

export const Calculator: React.FC<{}> = () => {
  // const classes = useStyles();
  const { showTracker } = useSelector((state: IRootState) => state);
  const { RiDivideFill, CloseIcon, RemoveIcon, AddIcon, CheckIcon } =
    trackerIcons;
  const calculatorApi = CalculatorApi.getSingleton();
  const dispatch = useDispatch();
  const postTransaction = () => {};

  useEffect(() => {
    dispatch({ type: "RESET" });
    calculatorApi.clear();
  }, [showTracker]);

  return (
    <Box
      flexGrow={1}
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <Box>
        <Box display='flex' justifyContent='center'>
          <Button
            id='7'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>7</Typography>
          </Button>
          <Button
            id='8'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>8</Typography>
          </Button>
          <Button
            id='9'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>9</Typography>
          </Button>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button
            id='4'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>4</Typography>
          </Button>
          <Button
            id='5'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>5</Typography>
          </Button>
          <Button
            id='6'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>6</Typography>
          </Button>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button
            id='1'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>1</Typography>
          </Button>
          <Button
            id='2'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>2</Typography>
          </Button>
          <Button
            id='3'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>3</Typography>
          </Button>
        </Box>
        <Box>
          <Button
            id='.'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>
              <Box textAlign='left'>,</Box>
            </Typography>
          </Button>
          <Button
            id='0'
            onClick={(e) => calculatorApi.appendNumber(e.currentTarget.id)}>
            <Typography variant='h6'>0</Typography>
          </Button>
          <Fab color='primary' size='small' onClick={() => postTransaction()}>
            <CheckIcon />
          </Fab>
        </Box>
      </Box>
      <Box>
        <Box
          borderRadius={16}
          display='flex'
          justifyContent='space-between'
          flexDirection='column'
          height='100%'
          bgcolor='grey.50'>
          <Button
            id='/'
            onClick={(e) => calculatorApi.chooseOperation(e.currentTarget.id)}>
            <RiDivideFill size={26} />
          </Button>
          <Button
            id='*'
            onClick={(e) => calculatorApi.chooseOperation(e.currentTarget.id)}>
            <CloseIcon />
          </Button>
          <Button
            id='-'
            onClick={(e) => calculatorApi.chooseOperation(e.currentTarget.id)}>
            <RemoveIcon />
          </Button>
          <Button
            id='+'
            onClick={(e) => calculatorApi.chooseOperation(e.currentTarget.id)}>
            <AddIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
