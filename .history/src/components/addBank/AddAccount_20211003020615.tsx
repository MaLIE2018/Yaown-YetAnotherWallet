import {
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import useStyles from "./AddAccount.style";
import { Api } from "api";
import useSelector from "hooks/useSelector";
import { useDispatch } from "hooks/useDispatch";
import { AlertVariants, Bank } from "types/types";
import { useState } from "react";
import GenericAlert from "components/Utils/Alert/GenericALert";
import { Autocomplete } from "@material-ui/lab";
import { RouteComponentProps, withRouter } from "react-router-dom";

const fetchApi = Api.getSingleton();

const AddAccount: React.FC<RouteComponentProps> = ({ location, history }) => {
  const classes = useStyles();
  const { bankAlert, settings } = useSelector((state) => state);
  const [banks, setBanks] = useState<Bank[] | []>([]);
  const [bankCode, setBankCode] = useState<string>("de");
  const [bank, setBank] = useState<Bank | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const loading = open && banks.length === 0;

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    setBankCode(event.target.value as string);
  };

  React.useEffect(() => {
    const status = new URLSearchParams(location.search).get("status");
    const id = new URLSearchParams(location.search).get("id");
    const code = new URLSearchParams(location.search).get("code");
    const state = new URLSearchParams(location.search).get("state");
    if (status === "successful-connected" && typeof id === "string") {
      setIsLoading(true);
      (async () => {
        const accounts = await fetchApi.getAccounts(id);
        if (accounts) {
          dispatch({ type: "TOGGLE_ADD_BANK_PAGE" });
        } else {
          dispatch({
            type: "TOGGLE_BANK_ALERT",
            payload: {
              variant: AlertVariants.error,
              text: "Something went wrong",
              show: true,
              type: "TOGGLE_BANK_ALERT",
            },
          });
        }
        setIsLoading(false);
      })();
    }
    //bunq follow up
    if (code && state) {
      const bunqAccount = settings.accounts.find(account => account.bankName === "Bunq");
      console.log('bunqAccount:', bunqAccount)
      if(!bunqAccount){
        (async () => {
          setIsLoading(true);
          const connect = await fetchApi.getToken(code, state);
          if (connect) {
            dispatch({ type: "TOGGLE_ADD_BANK_PAGE" });
            history.push("/wealth");
          } else {
            dispatch({
              type: "TOGGLE_BANK_ALERT",
              payload: {
                variant: AlertVariants.error,
                text: "Something went wrong",
                show: true,
                type: "TOGGLE_BANK_ALERT",
              },
            });
          }
          setIsLoading(false);
        })();
      }else {
        dispatch({
          type: "TOGGLE_BANK_ALERT",
          payload: {
            variant: AlertVariants.info,
            text: "You already added Bunq.",
            show: true,
            type: "TOGGLE_BANK_ALERT",
          },
        });
      }
    }
    if (status === "successful-connected-with-bunq") {
      console.log("Success");
    }
  }, [new URLSearchParams(location.search).get("id")]);

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      const banks = await fetchApi.getBanks(bankCode);
      if (banks) {
        setBanks(banks);
      } else {
        dispatch({
          type: "TOGGLE_BANK_ALERT",
          payload: {
            variant: AlertVariants.error,
            text: "Something went wrong",
            show: true,
            type: "TOGGLE_BANK_ALERT",
          },
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setBanks([]);
    }
  }, [open]);

  React.useEffect(() => {
    (async () => {
      if (bank)
        if (!(await fetchApi.accountExist(bank.id))) {
          let agreement;
          if (bank) {
            agreement = await fetchApi.createEnduserAgreement(bank.id);
          }
          let requisition = true;
          if (agreement) {
            if (bank) requisition = await fetchApi.createRequisition(bank.id);
          }
          let initiateLink;
          if (requisition) {
            if (bank) initiateLink = await fetchApi.getLink(bank.id);
          }
        } else {
          dispatch({
            type: "TOGGLE_BANK_ALERT",
            payload: {
              variant: AlertVariants.info,
              text: "Bank is already added",
              show: true,
              type: "TOGGLE_BANK_ALERT",
            },
          });
        }
    })();
  }, [bank]);

  return (
    <Box
      className={classes.addAccount}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      p={2}>
      <AccountBalanceIcon fontSize='large' />
      <Box width='100%' mt={8} display='flex' justifyContent='center'>
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel id='demo-simple-select-label'>Country</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='country-select'
            value={bankCode}
            onChange={handleChange}>
            <MenuItem value={"de"}>Germany</MenuItem>
            <MenuItem value={"fr"}>France</MenuItem>
            <MenuItem value={"gb"}>Great Britain</MenuItem>
            <MenuItem value={"nl"}>Netherlands</MenuItem>
            <MenuItem value={"it"}>Italy</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <GenericAlert {...bankAlert} />
      <Box width='100%' mt={4} display='flex' justifyContent='center'>
        <FormControl className={classes.formControl}>
          <Autocomplete
            id='bank-select'
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionSelected={(bank: Bank, value: Bank) => {
              setBank(bank as Bank);
              return bank.name === value.name;
            }}
            getOptionLabel={(bank: Bank) => bank.name}
            options={banks}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Choose your Bank'
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
      </Box>

      {isLoading ? (
        <Box
          justifyContent='center'
          display='flex'
          flexGrow='1'
          height='100%'
          flexDirection='column'>
          <Typography component='div'>
            <Box
              textAlign='center'
              fontSize='h6.fontSize'
              letterSpacing={3}
              lineHeight={1.0}>
              Your accounts are loading...
            </Box>
          </Typography>
          <Box display='flex' justifyContent='center' mt={2}>
            <CircularProgress color='secondary' />
          </Box>
        </Box>
      ) : (
        <Box
          display='flex'
          justifyContent='center'
          mt={4}
          flexDirection='column'
          alignItems='center'
          width='90%'>
          <Typography component='div'>
            <Box my={4}>Alternative</Box>
          </Typography>
          <Button
            variant='contained'
            onClick={async () => await fetchApi.getAuth()}
            fullWidth={true}
            startIcon={
              <img
                src={process.env.PUBLIC_URL + "/images/bunq.ico"}
                alt='bunq'
              />
            }>
            Connect to bunq
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default withRouter(AddAccount);
