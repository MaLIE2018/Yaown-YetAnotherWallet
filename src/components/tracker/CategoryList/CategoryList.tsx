import { List, ListItem } from "@material-ui/core";

import React from "react";
import { useDispatch } from "react-redux";
import categories from "../../../assets/categories";
import { capitalizeWords } from "../../../utils/helpers/text";
import useStyles from "./CategoryList.styles";

const CategoryList: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <List>
        {categories.map((category) => (
          <ListItem
            onClick={() => {
              dispatch({ type: "SET_TA", payload: { category: category } });
              dispatch({ type: "TOGGLE_CATEGORY_MODAL" });
            }}>
            {capitalizeWords(category)}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
