import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
  MenuItem,
} from '@material-ui/core';
import * as yup from 'yup';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './AddAsset.style';
import { KeyboardDatePicker } from '@material-ui/pickers';
import trackerIcons from '../icons/trackerIcons';
import { typeNames } from 'types/types';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Asset } from 'types/bankAccount';
import { useFormik } from 'formik';

export const AddAsset: React.FC<{}> = () => {
  const { DateRangeIcon } = trackerIcons;
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [asset, setAsset] = React.useState<Asset>({
    name: '',
    value: 0,
    type: '',
    valueDate: new Date().toISOString(),
    currency: '',
    residualDebt: 0,
    residualDebtDate: new Date().toISOString(),
    savingRate: 0,
    description: '',
    note: '',
  });

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAsset((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAsset((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const validationSchema = yup.object({
    type: yup.string().required('Please select a type.'),
    name: yup.string().required('A name is needed'),
    value: yup.string().required('A value is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      value: 0,
      type: '',
      valueDate: new Date().toISOString(),
      currency: '',
      residualDebt: 0,
      residualDebtDate: new Date().toISOString(),
      savingRate: 0,
      description: '',
      note: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
     
      console.log(values);
    },
  });
  return (
    <div className={classes.addAsset}>
      <List>
        <form onSubmit={formik.handleSubmit}>
          <ListItem>
            <FormControl variant='standard'>
              {/* <InputLabel id='assetTypeLabel'>Asset Type</InputLabel> */}
              <Select
                labelId='assetTypeLabel'
                id='type'
                name='type'
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}>
                {Object.entries(typeNames).map((entry, i) => (
                  <MenuItem value={entry[0]}>{entry[1]}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <Typography component='div'>
              <Box fontWeight='fontWeightRegular'>Name</Box>
            </Typography>
            <FormControl>
              <TextField
                type='text'
                id='name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                aria-describedby='standard-cName-helper-text'
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <Typography component='div'>
              <Box fontWeight='fontWeightRegular'>Description</Box>
            </Typography>
            <FormControl>
              <Input
                type='text'
                id='standard-adornment-cDescription'
                value={asset.description}
                name='description'
                onChange={handleChange}
                aria-describedby='standard-cDescription-helper-text'
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <Typography component='div'>
              <Box fontWeight='fontWeightRegular'>Current Value</Box>
            </Typography>
            <FormControl>
              <Input
                type='number'
                id='standard-adornment-cValue'
                value={asset.value}
                name='value'
                onChange={handleChange}
                endAdornment={<InputAdornment position='end'>Euros</InputAdornment>}
                aria-describedby='standard-cValue-helper-text'
                inputProps={{
                  min: '0',
                  'aria-label': 'euros',
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <Typography component='div'>
              <Box fontWeight='fontWeightRegular'>Current value date</Box>
            </Typography>
            <KeyboardDatePicker
              id='valueDate'
              value={new Date(asset.valueDate)}
              format='yyyy-mm-dd'
              onChange={(date) =>
                setAsset((state) => {
                  return { ...state, valueDate: date!.toISOString() };
                })
              }
              rightArrowIcon={<DateRangeIcon />}
            />
          </ListItem>
          <ListItem>
            <Typography component='div'>
              <Box fontWeight='fontWeightRegular'>Residual Debt</Box>
            </Typography>
            <FormControl>
              <Input
                type='number'
                id='standard-adornment-cValue'
                value={asset.residualDebt}
                name='residualDebt'
                onChange={handleChange}
                endAdornment={<InputAdornment position='end'>Euros</InputAdornment>}
                aria-describedby='standard-cValue-helper-text'
                inputProps={{
                  min: '0',
                  'aria-label': 'euros',
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <Typography component='div'>
              <Box fontWeight='fontWeightRegular'>Saving Rate</Box>
            </Typography>
            <FormControl>
              <Input
                type='number'
                id='standard-adornment-cValue'
                value={asset.savingRate}
                name='savingRate'
                onChange={handleChange}
                endAdornment={<InputAdornment position='end'>Euros</InputAdornment>}
                aria-describedby='standard-cValue-helper-text'
                inputProps={{
                  min: '0',
                  'aria-label': 'euros',
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <Typography component='div'>
              <Box fontWeight='fontWeightRegular'>Residual Debt Date</Box>
            </Typography>
            <KeyboardDatePicker
              name='residualDebtDate'
              rightArrowIcon={<DateRangeIcon />}
              value={new Date(asset.residualDebtDate)}
              format='yyyy-mm-dd'
              onChange={(date) =>
                setAsset((state) => {
                  return { ...state, residualDebtDate: date!.toISOString() };
                })
              }
            />
          </ListItem>
          <ListItem>
            <TextField
              id='cNote'
              label='Note'
              multiline
              rows={4}
              defaultValue='Write anything'
              value={asset.note}
              name='note'
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={isLoading ? true : false}
              size='large'
              fullWidth={true}
              startIcon={isLoading ? <CircularProgress color='secondary' /> : null}>
              Add Asset
            </Button>
          </ListItem>
        </form>
      </List>
    </div>
  );
};
export default AddAsset;
