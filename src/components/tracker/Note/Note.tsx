import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";

export const Note: React.FC<{}> = () => {
  return (
    <div>
      <TextField id='outlined-basic' label='Note' variant='outlined' />
      <Button color='primary'>Cancel</Button>
      <Button color='primary'>Ok</Button>
    </div>
  );
};
