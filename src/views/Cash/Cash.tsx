import { Paper } from "@material-ui/core";
import React from "react";
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
  return (
    <div className={classes.root}>
      {categories.map((category) => (
        <Paper elevation={0}>{category}</Paper>
      ))}
    </div>
  );
};

export default Cash;
