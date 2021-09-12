import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import React from "react";
import ByCategoryList from "./Lists/byCategory/ByCategoryList";
import useStyles from "./Overview.styles";
import { useDispatch } from "hooks/useDispatch";
import { PieChart } from "./../../components/layout/diagram/pie/PieChart";
import LineChart from "components/layout/diagram/line/LineChart";
import Filter from "./Filter/Filter";
import useSelector from "hooks/useSelector";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Api } from "../../api/index";
import { CategoryGroup } from "types/types";
import { Box, Typography } from "@material-ui/core";
import { theme } from "theme/Theme";
import getCurrencySymbol from "currency-symbols";

const Overview = () => {
  const fetchApi = Api.getSingleton();
  const classes = useStyles();
  const { timeMenu, accountMenu, settings } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      await fetchApi.getTransactionsByCategory();
      await fetchApi.getTransactionsByDate();
      await fetchApi.getExpensesIncomes();
    })();
  }, [timeMenu.range, accountMenu.selected]);

  return (
    <div className={classes.overview}>
      <Filter />

      {settings.txnByCategory.length !== 0 &&
      settings.statement.length !== 0 ? (
        <>
          <GeneralBox
            title=''
            render={
              <>
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-evenly'>
                  <Box
                    borderRadius={16}
                    borderColor='grey.500'
                    border={1}
                    boxShadow={1}
                    mr={1}
                    width='50%'>
                    <Typography component='p'>
                      <Box textAlign='center'>Expenses</Box>
                      <Box textAlign='center'>
                        {`${-Number(
                          settings?.statement[0].expenses
                        )} ${getCurrencySymbol("EUR")}`}
                      </Box>
                    </Typography>
                  </Box>
                  <Box
                    borderRadius={16}
                    borderColor='grey.500'
                    border={1}
                    boxShadow={1}
                    width='50%'>
                    <Typography component='p'>
                      <Box textAlign='center'>Income</Box>
                      <Box textAlign='center'>
                        {`${Number(
                          settings?.statement[0].incomes
                        )} ${getCurrencySymbol("EUR")}`}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <Typography component='div'>
                  <Box
                    display='flex'
                    flexDirection='row'
                    width='100%'
                    mt={2}
                    justifyContent='center'>
                    {timeMenu.selected !== "All"
                      ? timeMenu.selected + " "
                      : "All time"}
                    <Box>&nbsp;saving rate&nbsp; </Box>
                    <Box fontWeight='fontWeightMedium'>
                      {(
                        settings?.statement[0].expenses +
                        settings?.statement[0].incomes
                      ).toFixed(2)}{" "}
                      {getCurrencySymbol("EUR")}
                    </Box>
                  </Box>
                </Typography>
              </>
            }></GeneralBox>
          <GeneralBox
            title='By Category'
            render={
              <PieChart
                series={settings.txnByCategory.reduce(
                  (acc: number[], val: CategoryGroup) => {
                    if (val.total < 0) acc.push(-val.total);
                    else acc.push(val.total);
                    return acc;
                  },
                  []
                )}
                labels={settings.txnByCategory.reduce(
                  (acc: string[], val: CategoryGroup) => {
                    acc.push(val._id);
                    return acc;
                  },
                  []
                )}
              />
            }></GeneralBox>
          {(timeMenu.selected === "Annually" ||
            timeMenu.selected === "Monthly") && (
            <GeneralBox
              title='By Date'
              render={
                <LineChart
                  interval={timeMenu.selected}
                  items={settings.txnByDate}
                />
              }></GeneralBox>
          )}

          <GeneralBox
            title='All Category'
            render={<ByCategoryList />}></GeneralBox>
        </>
      ) : (
        <Box
          height='60vh'
          width='100%'
          display='flex'
          alignItems='center'
          flexDirection='column'
          pt={theme.spacing(1)}>
          <Box>
            <InsertEmoticonIcon
              style={{ fontSize: 180, color: theme.palette.text.hint }}
            />
          </Box>
          <Typography component='div'>
            <Box fontSize='h6.fontSize' color={theme.palette.text.hint}>
              No records in selected period.
            </Box>
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Overview;
