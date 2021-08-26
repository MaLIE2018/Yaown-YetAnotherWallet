import { Box, Typography, Button } from "@material-ui/core";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/types/types";
import useStyles from "./CalculationRow.styles";
import trackerIcons from "../../icons/trackerIcons";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import { theme } from "../../../theme/Theme";
import CalculatorApi from "../../../services/calculator";

const CalculationRow: React.FC<{}> = () => {
  const classes = useStyles();
  const { calc, transaction } = useSelector((state: IRootState) => state);
  const { BackspaceIcon } = trackerIcons;
  const dispatch = useDispatch();
  const calculatorApi = CalculatorApi.getSingleton();
  const amount = useRef<HTMLDivElement>(null);

  const left = {
    bg: theme.palette.success.main,
  };
  const right = {
    bg: theme.palette.error.main,
  };

  const [{ x, bg }, api] = useSpring(() => ({ x: 0, y: 0, ...right }));

  const bind = useDrag(({ active, movement: [x, y] }) => {
    api.start({ x: active ? x * 100 : 0, y, ...(x < 0 ? left : right) });
    if (theme.palette.error.main === bg.animation.to) {
      dispatch({ type: "EXPENSE" });
      dispatch({
        type: "SET_TA",
        payload: {
          transactionAmount: {
            ...transaction.transactionAmount,
            amount: "-" + calc.result.replace(",", "."),
          },
        },
      });
    } else {
      dispatch({ type: "INCOME" });
      if (/[-]/.test(transaction.transactionAmount.amount)) {
        dispatch({
          type: "SET_TA",
          payload: {
            transactionAmount: {
              ...transaction.transactionAmount,
              amount: calc.result.replace(",", ".").slice(1),
            },
          },
        });
      } else {
        dispatch({
          type: "SET_TA",
          payload: {
            transactionAmount: {
              ...transaction.transactionAmount,
              amount: calc.result.replace(",", "."),
            },
          },
        });
      }
    }
  });

  return (
    <Box className={classes.root} flexGrow={1}>
      <div>
        <div className={classes.amount}>
          <Typography variant='h3' gutterBottom>
            <animated.div ref={amount} style={{ color: bg }}>
              ${calc.result}
            </animated.div>
          </Typography>
          {calc.calcStr !== "" && (
            <Button
              onClick={() => {
                calculatorApi.delete();
              }}>
              <BackspaceIcon />
            </Button>
          )}
        </div>
        {/([-/*+])/.test(calc.calcStr) && (
          <Box className={classes.calcRow} textAlign='right' px={2}>
            {calc.calcStr}
          </Box>
        )}
      </div>
      <animated.div
        className={classes.draggable}
        {...bind()}
        style={{ x }}></animated.div>
    </Box>
  );
};

export default CalculationRow;
