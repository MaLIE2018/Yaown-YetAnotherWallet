import "date-fns";
import React, { useState } from "react";
import useStyles from "./Tracker.styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/types/types";
import { animated, useSpring } from "react-spring";
import { Calculator } from "./Calculator/Calculator";
import { Box, Button, Fab } from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { Note } from "./Note/Note";
import GenericModal from "../Utils/GenericModal/GenericModal";
import CategoryList from "./CategoryList/CategoryList";

const Tracker: React.FC<{}> = () => {
  const { showTracker, showNoteModal, showCategoryModal, transaction } =
    useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const classes = useStyles(showTracker);
  const styles = useSpring({
    translateY: showTracker ? 0 : 100,
  });
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    dispatch({ type: "SET_TA", payload: { date: date } });
    setSelectedDate(date);
  };
  const handleTimeChange = (date: Date | null) => {
    dispatch({ type: "SET_TA", payload: { time: date } });
    setSelectedTime(date);
  };

  return (
    <animated.div className={classes.root} style={{ ...styles }}>
      <Box className={classes.calculationRow} flexGrow={1}>
        <Typography variant='h3' gutterBottom>
          <Box color='success.main'>${transaction.amount}</Box>
        </Typography>
        <Box alignSelf='center'>
          <Button>
            <BackspaceIcon />
          </Button>
        </Box>
      </Box>
      <div className={classes.buttonRow}>
        <Button
          variant='contained'
          onClick={() => dispatch({ type: "TOGGLE_CATEGORY_MODAL" })}>
          {transaction.category}
        </Button>
        <Fab
          color='primary'
          size='small'
          onClick={() => dispatch({ type: "TOGGLE_NOTE_MODAL" })}>
          <NotesIcon />
        </Fab>

        <Fab color='primary' size='small'>
          <KeyboardDatePicker
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            rightArrowIcon={<DateRangeIcon />}
          />
        </Fab>
        <Fab color='primary' size='small'>
          <KeyboardTimePicker
            placeholder='08:00 AM'
            mask='__:__ _M'
            value={selectedTime}
            onChange={(date) => handleTimeChange(date)}
            keyboardIcon={<ScheduleIcon />}
          />
        </Fab>
      </div>
      <Calculator />
      <GenericModal
        show={showNoteModal}
        toggleModal={() => dispatch({ type: "TOGGLE_NOTE_MODAL" })}
        render={<Note />}
      />
      <GenericModal
        show={showCategoryModal}
        toggleModal={() => dispatch({ type: "TOGGLE_CATEGORY_MODAL" })}
        render={<CategoryList />}
      />
    </animated.div>
  );
};

export default Tracker;
