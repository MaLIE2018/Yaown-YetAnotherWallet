import { Button, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tracker from "../../components/tracker/Tracker";
import { IRootState } from "../../store/types/types";
import { useStyles } from "./Cash.styles";

const categories = [
  "Abhebungen",
  "Abos & Spenden",
  "Bars&Restaurants",
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
        <Paper elevation={0} key={category}>
          <Button onClick={() => dispatch({ type: "TOGGLE_TRACKER" })}>
            {category}
          </Button>
        </Paper>
      ))}
      <Tracker />
    </div>
  );
};

export default Cash;
