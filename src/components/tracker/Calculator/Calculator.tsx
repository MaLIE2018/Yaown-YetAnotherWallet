import { Box, Button, Fab } from "@material-ui/core";
import React from "react";
// import useStyles from "./Calculator.styles";
import Typography from "@material-ui/core/Typography";
import trackerIcons from "../../icons/trackerIcons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/types/types";

export const Calculator: React.FC<{}> = () => {
  // const classes = useStyles();
  const { RiDivideFill, CloseIcon, RemoveIcon, AddIcon, CheckIcon } =
    trackerIcons;
  const dispatch = useDispatch();
  // const { amount } = useSelector((state: IRootState) => state.transaction);
  const { calcArr } = useSelector((state: IRootState) => state);

  const getCurrentSymbol = (id: any) => {
    switch (true) {
      case isNaN(parseInt(id)): // Sign
        if (
          typeof calcArr[calcArr.length - 1] === "string" &&
          calcArr.length > 0
        ) {
          if (/[/*+-]/.test(calcArr[calcArr.length - 1].toString())) {
            dispatch({
              type: "SET_CALC",
              payload: calcArr.slice(0, -1).concat(id),
            });
          } else {
            dispatch({
              type: "ADD_ELEMENT",
              payload: id,
            });
          }
        }

        break;
      case !isNaN(parseFloat(id)): // Number
        if (typeof calcArr[calcArr.length - 1] === "number") {
          dispatch({
            type: "SET_CALC",
            payload: calcArr
              .slice(0, -1)
              .concat(parseFloat(calcArr[calcArr.length - 1] + id)),
          });
        } else {
          dispatch({
            type: "ADD_ELEMENT",
            payload: parseFloat(id),
          });
        }

        break;
    }
  };

  return (
    <Box
      flexGrow={1}
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <Box>
        <Box display='flex' justifyContent='center'>
          <Button id='7' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>7</Typography>
          </Button>
          <Button id='8' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>8</Typography>
          </Button>
          <Button id='9' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>9</Typography>
          </Button>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button id='4' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>4</Typography>
          </Button>
          <Button id='5' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>5</Typography>
          </Button>
          <Button id='6' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>6</Typography>
          </Button>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button id='1' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>1</Typography>
          </Button>
          <Button id='2' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>2</Typography>
          </Button>
          <Button id='3' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>3</Typography>
          </Button>
        </Box>
        <Box>
          <Button id=',' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>
              <Box textAlign='left'>,</Box>
            </Typography>
          </Button>
          <Button id='0' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <Typography variant='h6'>0</Typography>
          </Button>
          <Fab color='primary' size='small'>
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
          <Button id='/' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <RiDivideFill size={26} />
          </Button>
          <Button id='*' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <CloseIcon />
          </Button>
          <Button id='-' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <RemoveIcon />
          </Button>
          <Button id='+' onClick={(e) => getCurrentSymbol(e.currentTarget.id)}>
            <AddIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
