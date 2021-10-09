import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import isEmail from "validator/lib/isEmail";
import {
  InputAdornment,
  IconButton,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Switch,
  CircularProgress,
  Link,
} from "@material-ui/core";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useStyles from "./Login.style";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Api } from "../../api/index";
import GenericAlert from "components/Utils/Alert/GenericALert";
import { useDispatch } from "hooks/useDispatch";
import { AlertVariants } from "types/types";
import useSelector from "hooks/useSelector";
import { RouteComponentProps, withRouter } from "react-router-dom";
interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const loginApi = Api.getSingleton();

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const { loginAlert } = useSelector((state) => state);
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      let status;
      if (!isEmail(values.email)) {
        dispatch({
          type: "TOGGLE_LOGIN_ALERT",
          payload: {
            variant: AlertVariants.error,
            text: "Email is not valid",
            show: true,
            type: "TOGGLE_LOGIN_ALERT",
          },
        });
      }
      if (value === 0) {
        status = await loginApi.login(values.email, values.password);
      } else {
        status = await loginApi.register(values.email, values.password);
      }
      if (status === true) {
        setIsLoading(false);
        history.push("/cash");
      } else {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container className={classes.login}>
      <Box mt={4} width='100%'>
        <Typography component='div'>
          <Box fontSize='h4.fontSize' ml={5}>
            Welcome at,
          </Box>
        </Typography>

        <Typography component='div'>
          <Box
            textAlign='right'
            fontFamily='Cutive'
            fontSize='h4.fontSize'
            letterSpacing={3}
            lineHeight={1.0}
            mr={5}>
            yaown
          </Box>
        </Typography>
      </Box>
      <Box mt={3}>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='secondary'
          onChange={handleChange}
          aria-label='disabled tabs example'>
          <Tab label='Login' />
          <Tab label='SignUp' />
        </Tabs>
      </Box>
      <Box display='flex' alignItems='center' flexDirection='column' mt={3}>
        <Button variant='contained' fullWidth={true} size='large'>
          {value === 1 ? "Sign up with Google" : "Login with Google"}
        </Button>
        <Box textAlign='center' my={3}>
          or
        </Box>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id='email'
              label='email'
              name='email'
              variant='outlined'
              value={formik.values.email}
              className={clsx(classes.margin, classes.textField)}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                type={values.showPassword ? "text" : "password"}
                id='password'
                name='password'
                label='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                // helperText={formik.touched.password && formik.errors.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Box
              mt={3}
              display='flex'
              flexDirection='column'
              justifyContent='center'>
              {value === 0 ? (
                <Link
                  href='#'
                  onClick={(e) => e.preventDefault()}
                  color='inherit'>
                  "Don't remember your password?"
                </Link>
              ) : (
                <FormControlLabel
                  control={
                    <Switch
                      inputProps={{ "aria-label": "primary checkbox" }}
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                  }
                  label="I agree to Yaown's Terms & Conditions and Privacy Policy."
                />
              )}
            </Box>
            <Box mt={3} width='100%'>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!checked && value === 1 ? true : false}
                size='large'
                fullWidth={true}
                startIcon={
                  isLoading ? <CircularProgress color='secondary' /> : null
                }>
                {value === 0 ? "LOGIN" : "SIGN UP"}
              </Button>
              
            </Box>
          </form>
        </Box>
      </Box>
      <GenericAlert {...loginAlert} />
    </Container>
  );
};

export default withRouter(Login);
