import { Box, Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/types/types";
import { capitalizeWords } from "../../utils/helpers/text";
import { useStyles } from "./Cash.styles";
import { Api } from "../../api/index";
import categories from "../../assets/categories";

const Cash: React.FC<{}> = () => {
  const { showTracker } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const classes = useStyles(showTracker);
  const isLogged = Api.getSingleton().isLoggedIn();
  console.log("isLogged:", isLogged);

  return (
    <div className={classes.root}>
      {categories.map((category) => (
        <Box
          key={category.name}
          bgcolor='grey.100'
          borderRadius={16}
          display='flex'
          flexDirection='column'>
          <Button
            onClick={() => {
              dispatch({
                type: "SET_TA",
                payload: { category: category.name },
              });
              dispatch({ type: "TOGGLE_TRACKER" });
            }}>
            <Box display='flex' justifyContent='center'>
              {<category.icon />}
            </Box>
            <div className={classes.text}>{capitalizeWords(category.name)}</div>
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default Cash;
