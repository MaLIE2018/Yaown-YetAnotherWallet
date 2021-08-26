import {
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
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
  const { showBankAlert } = useSelector((state) => state);
  const [banks, setBanks] = useState<Bank[] | undefined>(undefined);
  const [bank, setBank] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    setBank(event.target.value as string);
    const banks = await fetchApi.getBanks(event.target.value as string);
    if (banks) {
      setBanks(banks);
    } else {
      dispatch({
        type: "TOGGLE_BANK_ALERT",
        payload: {
          variant: AlertVariants.success,
          text: "Transaction created",
          show: true,
        },
      });
    }
  };

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
      <GenericAlert
        show={showBankAlert.show}
        text={showBankAlert.text}
        variant={showBankAlert.variant}
      />
      {banks && (
        <Autocomplete
          id='grouped-demo'
          options={banks.sort((a, b) => -b.name.localeCompare(a.name))}
          groupBy={(banks) => banks.name}
          getOptionLabel={(banks) => banks.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label='With categories' variant='outlined' />
          )}
        />
      )}
    </Box>
  );
};

export default AddAccount;
