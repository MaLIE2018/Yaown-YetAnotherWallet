import { Button, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Tracker from "../../components/tracker/Tracker";
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
  const classes = useStyles();
  const [show, setVisibility] = useState<boolean>(false);
  return (
    <div className={classes.root}>
      {categories.map((category) => (
        <Paper elevation={0} key={category}>
          <Button onClick={() => setVisibility(true)}>{category}</Button>
        </Paper>
      ))}
      <Tracker show={show} setVisibility={setVisibility} />
    </div>
  );
};

export default Cash;
