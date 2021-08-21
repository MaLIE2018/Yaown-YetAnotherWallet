import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./Note.styles";

export const Note: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [note, setNote] = useState<string>("");
  return (
    <div className={classes.root}>
      <TextField
        id='outlined-basic'
        label='Note'
        variant='outlined'
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className={classes.buttonsRow}>
        <Button
          color='primary'
          onClick={() => dispatch({ type: "TOGGLE_NOTE_MODAL" })}>
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={() => {
            dispatch({ type: "SET_TA", payload: { note: note } });
            dispatch({ type: "TOGGLE_NOTE_MODAL" });
          }}>
          Ok
        </Button>
      </div>
    </div>
  );
};
