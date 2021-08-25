import "date-fns";
import React, { useState, useEffect } from "react";
import useStyles from "./Tracker.styles";
import { useSelector } from "react-redux";
import { IRootState } from "store/types/types";
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
import { Category } from "types/types";
import { useDispatch } from "hooks/useDispatch";

const Tracker: React.FC<{}> = () => {
  const { showTracker, showNoteModal, showCategoryModal, transaction } =
    useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const classes = useStyles(showTracker);
  const { NotesIcon, DateRangeIcon, ScheduleIcon } = trackerIcons;
  const styles = useSpring({
    from: { marginBottom: "-100%", display: "none" },
    to: {
      marginBottom: showTracker ? "0%" : "-100%",
      display: showTracker ? "flex" : "none",
    },
  });
  const [selCat, setSelCat] = useState<Category>(categories[0]);
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
    const category = categories.find((c) => c.name === transaction.category);
    if (category) {
      setSelCat(category);
    }
  }, [transaction.category]);

  return (
    <animated.div className={classes.tracker} style={{ ...styles }}>
      <CalculationRow />
      <div className={classes.buttonRow}>
        <Button
          variant='contained'
          style={{ backgroundColor: selCat.color }}
          startIcon={<selCat.icon />}
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
