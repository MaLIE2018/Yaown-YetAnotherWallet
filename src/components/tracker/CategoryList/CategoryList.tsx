import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import categories from "assets/categories";
import { capitalizeWords } from "../../../utils/helpers/text";
import useStyles from "./CategoryList.styles";
import { useDispatch } from "hooks/useDispatch";

const CategoryList: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.categoryList}>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            onClick={() => {
              dispatch({
                type: "SET_TA",
                payload: { category: category.name },
              });
              dispatch({ type: "TOGGLE_CATEGORY_MODAL" });
            }}>
            <ListItemIcon>
              <category.icon />
            </ListItemIcon>
            <ListItemText primary={capitalizeWords(category.name)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
