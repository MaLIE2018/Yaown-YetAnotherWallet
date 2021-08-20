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
  const { showTracker } = useSelector((state: IRootState) => state);
  const [toggleNoteModal, setToggleNoteModal] = useState<boolean>(false);
  const [toggleCategoryModal, setToggleCategoryModal] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const classes = useStyles(showTracker);
  const styles = useSpring({
    translateY: showTracker ? 0 : 100,
  });
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <animated.div className={classes.root} style={{ ...styles }}>
      <Box className={classes.calculationRow} flexGrow={1}>
        <Typography variant='h3' gutterBottom>
          <Box color='success.main'>9.75</Box>
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
          onClick={() => setToggleCategoryModal(true)}>
          Restaurants
        </Button>
        <Fab
          color='primary'
          size='small'
          onClick={() => setToggleNoteModal(true)}>
          <NotesIcon />
        </Fab>

        <Fab color='primary' size='small'>
          <KeyboardDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            rightArrowIcon={<DateRangeIcon />}
          />
        </Fab>
        <Fab color='primary' size='small'>
          <KeyboardTimePicker
            placeholder='08:00 AM'
            mask='__:__ _M'
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            keyboardIcon={<ScheduleIcon />}
          />
        </Fab>
      </div>
      <Calculator />
      <GenericModal
        show={toggleNoteModal}
        toggleModal={setToggleNoteModal}
        render={<Note />}
      />
      <GenericModal
        show={toggleCategoryModal}
        toggleModal={setToggleCategoryModal}
        render={<CategoryList />}
      />
    </animated.div>
  );
};

export default Tracker;
