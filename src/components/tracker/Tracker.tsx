import "date-fns";
import React, { useState, useEffect, ReactNode } from "react";
import useStyles from "./Tracker.styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/types/types";
import { animated, useSpring } from "react-spring";
import { Calculator } from "./Calculator/Calculator";
import { Button, Fab } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { Note } from "./Note/Note";
import GenericModal from "../Utils/GenericModal/GenericModal";
import CategoryList from "./CategoryList/CategoryList";
import trackerIcons from "../icons/trackerIcons";
import CalculationRow from "./CalculationRow/CalculationRow";
import categories from "assets/categories";

const Tracker: React.FC<{}> = () => {
  const { showTracker, showNoteModal, showCategoryModal, transaction } =
    useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const classes = useStyles(showTracker);
  const { NotesIcon, DateRangeIcon, ScheduleIcon } = trackerIcons;
  const styles = useSpring({
    from: { marginBottom: "-100%" },
    to: { marginBottom: showTracker ? "0%" : "-100%" },
  });
  const [selCat, setSelCat] = useState<ReactNode>(categories[0].icon);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    dispatch({ type: "SET_TA", payload: { date: date!.toISOString() } });
    setSelectedDate(date);
  };
  const handleTimeChange = (date: Date | null) => {
    dispatch({ type: "SET_TA", payload: { time: date!.toISOString() } });
    setSelectedTime(date);
  };

  useEffect(() => {
    setSelCat(categories.find((c) => c.name === transaction.category)?.icon);
  }, [transaction.category]);

  return (
    <animated.div className={classes.root} style={{ ...styles }}>
      <CalculationRow />
      <div className={classes.buttonRow}>
        <Button
          variant='contained'
          onClick={() => dispatch({ type: "TOGGLE_CATEGORY_MODAL" })}>
          {/*  startIcon={<selCat />} */}
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
