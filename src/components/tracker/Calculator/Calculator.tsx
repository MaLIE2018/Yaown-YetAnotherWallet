import { Box, Button, Fab, Grid } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import useStyles from "./Calculator.styles";
import { RiDivideFill } from "react-icons/ri";
import Typography from "@material-ui/core/Typography";

export const Calculator: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <Box
      flexGrow={1}
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <Box>
        <Box display='flex' justifyContent='center'>
          <Button>
            <Typography variant='h6'>7</Typography>
          </Button>
          <Button>
            <Typography variant='h6'>8</Typography>
          </Button>
          <Button>
            <Typography variant='h6'>9</Typography>
          </Button>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button>
            <Typography variant='h6'>4</Typography>
          </Button>
          <Button>
            <Typography variant='h6'>5</Typography>
          </Button>
          <Button>
            <Typography variant='h6'>6</Typography>
          </Button>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button>
            <Typography variant='h6'>1</Typography>
          </Button>
          <Button>
            <Typography variant='h6'>2</Typography>
          </Button>
          <Button>
            <Typography variant='h6'>3</Typography>
          </Button>
        </Box>
        <Box>
          <Button>
            <Typography variant='h6'>
              <Box textAlign='left'>,</Box>
            </Typography>
          </Button>
          <Button>
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
          <Button>
            <RiDivideFill size={26} />
          </Button>
          <Button>
            <CloseIcon />
          </Button>
          <Button>
            <RemoveIcon />
          </Button>
          <Button>
            <AddIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
