import {
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  CircularProgress,
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

const fetchApi = Api.getSingleton();

const AddAccount: React.FC<{}> = () => {
  const classes = useStyles();
  const { bankAlert } = useSelector((state) => state);
  const [banks, setBanks] = useState<Bank[] | []>([]);
  const [bank, setBank] = useState<string | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const loading = open && banks.length === 0;
  console.log("loading:", loading);

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    let active = true;
    setBank(event.target.value as string);

    if (!loading) {
      return undefined;
    }
    const banks = await fetchApi.getBanks(event.target.value as string);
    console.log("banks:", banks);
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
    active = false;
  };

  React.useEffect(() => {
    if (!open) {
      setBanks([]);
    }
  }, [open]);

  return (
    <Box
      className={classes.addAccount}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      p={2}>
      <AccountBalanceIcon fontSize='large' />
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Country</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='bank-select'
          value={bank}
          onChange={handleChange}>
          <MenuItem value={"de"}>Germany</MenuItem>
          <MenuItem value={"fr"}>France</MenuItem>
          <MenuItem value={"gb"}>Great Britain</MenuItem>
        </Select>
      </FormControl>
      <GenericAlert {...bankAlert} />
      <Autocomplete
        id='asynchronous-demo'
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(bank, value) => bank.name === value.name}
        getOptionLabel={(bank) => bank.name}
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
    </Box>
  );
};

export default AddAccount;
