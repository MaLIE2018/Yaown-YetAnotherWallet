import { Box } from "@material-ui/core";
import React from "react";
import { theme } from "theme/Theme";
import useStyles from "./RenderLoader.style";

const RenderLoader: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      bgcolor={theme.yaown.main}
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <img
        src='https://res.cloudinary.com/dipmax-export/image/upload/v1629800429/yaown/logo_sla4om.png'
        alt=''
        width='300px'
        height='300px'
      />
    </Box>
  );
};

export default RenderLoader;
