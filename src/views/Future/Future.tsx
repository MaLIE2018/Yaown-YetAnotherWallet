import {
  Box,
  InputAdornment,
  List,
  ListItem,
  Typography,
  FormControl,
  Input,
} from "@material-ui/core";
import { PieChart } from "components/layout/diagram/pie/PieChart";
import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import React from "react";
import useStyles from "./Future,styles";
interface State {
  pension: string;
  age: string;
  savingRate: string;
  increaseSavingRate: string;
  lifetime: string;
  averageAnnualROI: string;
  desiredPension: string;
  otherIncome: string;
  cAge: string;
}
const Future: React.FC<{}> = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    pension: "1200",
    age: "67",
    increaseSavingRate: "3",
    savingRate: "2400",
    averageAnnualROI: "8",
    lifetime: "20",
    desiredPension: "2500",
    otherIncome: "500",
    cAge: "30",
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  return (
    <div className={classes.future}>
      <Box
        width='90%'
        height='10%'
        display='flex'
        justifyContent='start'
        ml={"5%"}
        alignItems='end'>
        <Typography component='div' style={{ width: "100%" }}>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            width='100%'>
            <Box fontWeight='fontWeightRegular' m={1}>
              Estimated monthly income 2058:
            </Box>
            <Box fontSize='h6.fontSize' fontWeight='fontWeightMedium' m={1}>
              1123 $
            </Box>
          </Box>
        </Typography>
      </Box>
      <GeneralBox
        render={
          <PieChart
            series={[]}
            labels={["Assets", "Investments", "Accounts", "Cash"]}
          />
        }
      />
      <GeneralBox
        render={
          <List>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Current age</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-cAge'
                  value={values.cAge}
                  onChange={handleChange("cAge")}
                  endAdornment={
                    <InputAdornment position='end'>years</InputAdornment>
                  }
                  aria-describedby='standard-cAge-helper-text'
                  inputProps={{
                    "aria-label": "years",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Retirement age</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-age'
                  value={values.age}
                  onChange={handleChange("age")}
                  endAdornment={
                    <InputAdornment position='end'>years</InputAdornment>
                  }
                  aria-describedby='standard-age-helper-text'
                  inputProps={{
                    "aria-label": "years",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Annual savings rate</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-savingRate'
                  value={values.savingRate}
                  onChange={handleChange("savingRate")}
                  endAdornment={
                    <InputAdornment position='end'>Euro</InputAdornment>
                  }
                  aria-describedby='standard-savingRate-helper-text'
                  inputProps={{
                    "aria-label": "saving rate",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>
                  Annual increase in savings rate
                </Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-increaseSaving'
                  value={values.increaseSavingRate}
                  onChange={handleChange("increaseSavingRate")}
                  endAdornment={
                    <InputAdornment position='end'>%</InputAdornment>
                  }
                  aria-describedby='standard-increaseSaving-helper-text'
                  inputProps={{
                    "aria-label": "Annual increase in savings rate",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Average Annual ROI</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-averageAnnualReturn'
                  value={values.averageAnnualROI}
                  onChange={handleChange("averageAnnualROI")}
                  endAdornment={
                    <InputAdornment position='end'>%</InputAdornment>
                  }
                  aria-describedby='standard-averageAnnualReturn-helper-text'
                  inputProps={{
                    "aria-label": "average Annual Return",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>
                  Forecast monthly pension
                </Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-pension'
                  value={values.pension}
                  onChange={handleChange("pension")}
                  endAdornment={
                    <InputAdornment position='end'>Euro </InputAdornment>
                  }
                  aria-describedby='standard-pension-helper-text'
                  inputProps={{
                    "aria-label": "forecast pension in Euro",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>
                  Lifetime period after retirement
                </Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-lifetime'
                  value={values.lifetime}
                  onChange={handleChange("lifetime")}
                  endAdornment={
                    <InputAdornment position='end'>Years </InputAdornment>
                  }
                  aria-describedby='standard-lifetime-helper-text'
                  inputProps={{
                    "aria-label": "Lifetime period after retirement in years",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Desired pension</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-desiredPension'
                  value={values.desiredPension}
                  onChange={handleChange("desiredPension")}
                  endAdornment={
                    <InputAdornment position='end'>Euro </InputAdornment>
                  }
                  aria-describedby='standard-desiredPension-helper-text'
                  inputProps={{
                    "aria-label": "Desired pension in euro",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Other monthly income</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-otherIncome'
                  value={values.otherIncome}
                  onChange={handleChange("otherIncome")}
                  endAdornment={
                    <InputAdornment position='end'>Euro </InputAdornment>
                  }
                  aria-describedby='standard-otherIncome-helper-text'
                  inputProps={{
                    "aria-label": "Other monthly income in euro",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
          </List>
        }
        title='Estimates'
      />
    </div>
  );
};

export default Future;
