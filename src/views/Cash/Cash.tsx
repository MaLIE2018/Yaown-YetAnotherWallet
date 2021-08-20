import { Box, Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/types/types";
import { capitalizeWords } from "../../utils/helpers/text";
import { useStyles } from "./Cash.styles";

const categories = [
  "Abhebungen",
  "Abos & Spenden",
  "Bars & Restaurants",
  "Berufsausgaben",
  "Bildung",
  "Essen & Lebensmittel",
  "Familien & Freunde",
  "Freizeit & Unterhaltung",
  "Gehalt",
  "Gesundheit & Drogerien",
  "Gutschriften",
  "Haushalt & Nebenkosten",
  "Medien & Mediathek",
  "Reisen & Urlaub",
  "Shopping",
  "Sonstiges",
  "Sparen & Investieren",
  "Steuern & Abgaben",
  "Transport & Auto",
  "Versicherungen & Finanzen",
];

const Cash: React.FC<{}> = () => {
  const { showTracker } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const classes = useStyles(showTracker);

  return (
    <div className={classes.root}>
      {categories.map((category) => (
        <Box key={category} bgcolor='grey.100' borderRadius={16}>
          <Button onClick={() => dispatch({ type: "TOGGLE_TRACKER" })}>
            {capitalizeWords(category)}
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default Cash;
