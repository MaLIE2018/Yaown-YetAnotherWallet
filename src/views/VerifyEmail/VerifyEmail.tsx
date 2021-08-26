import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
import useStyles from "./Verify.style";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Api } from "../../api/index";
import GenericAlert from "components/Utils/Alert/GenericALert";
import { useDispatch } from "hooks/useDispatch";
import { AlertVariants } from "types/types";
import useSelector from "hooks/useSelector";
interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const loginApi = Api.getSingleton();

const VerifyEmail: React.FC<{}> = () => {
  const classes = useStyles();

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
      <Box
        mt={4}
        width='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <Typography component='div'>
          <Box fontSize='h4.fontSize'>
            You must verify your email address to continue
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
