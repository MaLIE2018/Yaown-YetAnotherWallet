import React from "react";
import { IconButton, Box, Button, Avatar } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useStyles from "./Filter.style";
import GenericMenu from "components/Utils/Menu/GenericeMenu";
import useSelector from "hooks/useSelector";
import { useDispatch } from "hooks/useDispatch";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const Filter: React.FC<{}> = () => {
  const classes = useStyles();
  const { accountMenu, timeMenu, settings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date()
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      width='90%'
      height='25%'
      display='flex'
      justifyContent='start'
      alignItems='center'
      flexDirection='column'
      margin='auto'
      mt={2}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        width='100%'>
        <Button
          variant='contained'
          color='secondary'
          fullWidth
          startIcon={
            accountMenu.selected !== "All" &&
            accountMenu.selected !== "Cash" ? (
              <Avatar
                alt='ba'
                src={
                  settings.accounts.find((a) => a.name === accountMenu.selected)
                    ?.logo
                }
              />
            ) : null
          }
          onClick={(event) => {
            handleClick(event);
            dispatch({ type: "TOGGLE_ACCOUNT_MENU" });
          }}>
          {accountMenu.selected}
        </Button>
      </Box>
      <Box display='flex' justifyContent='space-between' width='100%' mt={1}>
        <Box>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            onClick={(event) => {
              handleClick(event);
              dispatch({ type: "TOGGLE_TIME_MENU" });
            }}>
            {timeMenu.selected}
          </Button>
        </Box>
        {timeMenu.selected !== "All" && (
          <Box ml={1}>
            <Button
              className={classes.dateChooser}
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={
                <IconButton
                  aria-label='backward'
                  onClick={() => console.log("Test")}>
                  <ArrowBackIosIcon />
                </IconButton>
              }
              endIcon={
                <IconButton aria-label='forward'>
                  <ArrowForwardIosIcon />
                </IconButton>
              }>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                views={["month"]}
                labelFunc={(
                  date: MaterialUiPickersDate,
                  invalidLabel: string
                ) => {
                  if (date !== null) {
                    return date.toISOString();
                  }
                  return "4. Mail 2020";
                }}
              />
            </Button>
          </Box>
        )}
      </Box>
      <GenericMenu
        open={accountMenu.open}
        handleClose={() => dispatch({ type: "TOGGLE_ACCOUNT_MENU" })}
        handleChange={(newValue: string) =>
          dispatch({
            type: "SELECT_ACCOUNT",
            payload: newValue,
          })
        }
        items={[...settings.accounts, { name: "All" }]}
        anchorEl={anchorEl}
      />
      <GenericMenu
        open={timeMenu.open}
        handleClose={() => dispatch({ type: "TOGGLE_TIME_MENU" })}
        handleChange={(newValue: string) =>
          dispatch({ type: "SELECT_TIME", payload: newValue })
        }
        items={[
          { name: "Daily" }, // "date"
          { name: "Weekly" }, // ""
          { name: "Monthly" }, // "month"
          { name: "Annually" }, // "view"
          { name: "All" },
        ]}
        anchorEl={anchorEl}
      />
    </Box>
  );
};
export default Filter;
