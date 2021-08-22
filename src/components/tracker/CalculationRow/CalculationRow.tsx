import { Box, Typography, Button } from "@material-ui/core";
import React, { useEffect } from "react";
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
  const { amount } = useSelector((state: IRootState) => state.transaction);
  const { calc } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const { BackspaceIcon } = trackerIcons;

  const calculatorApi = CalculatorApi.getSingleton();

  const left = {
    bg: theme.palette.success.main,
  };
  const right = {
    bg: theme.palette.error.main,
  };

  const [{ x, y, bg }, api] = useSpring(() => ({ x: 0, y: 0, ...left }));
  const bind = useDrag(({ active, movement: [x, y] }) => {
    api.start({ x: active ? x * 100 : 0, y, ...(x < 0 ? left : right) });
  });

  return (
    <Box className={classes.root} flexGrow={1}>
      {console.log("calc.result:", calc.result)}
      <div>
        <div className={classes.amount}>
          <Typography variant='h3' gutterBottom>
            <animated.div style={{ color: bg }}>${calc.result}</animated.div>
          </Typography>
          {calc.result.length >= 1 && (
            <Button
              onClick={() => {
                calculatorApi.delete();
              }}>
              <BackspaceIcon />
            </Button>
          )}
        </div>
        {calc.calcStr !== "" && (
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
