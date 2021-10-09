import { Box, Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "store/types/types";
import { useStyles } from "./Cash.styles";
import { Api } from "api/index";
import categories from "assets/categories";
import { theme } from "theme/Theme";
import GenericAlert from "components/Utils/Alert/GenericALert";
import { t } from "i18n-js";

const Cash: React.FC<{}> = () => {
  const { showTracker, transactionAlert } = useSelector(
    (state: IRootState) => state
  );
  const dispatch = useDispatch();
  const classes = useStyles(showTracker);
  const isLogged = Api.getSingleton().isLoggedIn();
  console.log("isLogged:", isLogged);

  return (
    <>
      <div className={classes.cash}>
        {categories.map((category) => (
          <Box
            key={category.name}
            bgcolor={theme.palette.primary.light}
            borderRadius={theme.shape.borderRadius}
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
              <div
                className={classes.divider}
                style={{
                  backgroundColor: showTracker
                    ? `${theme.palette.grey[600]}`
                    : `${category.color}`,
                }}></div>
              <div className={classes.text}>
                {t(`categories.${category.name}`)}
              </div>
            </Button>
          </Box>
        ))}
      </div>
      <GenericAlert {...transactionAlert} />
    </>
  );
};

export default Cash;
