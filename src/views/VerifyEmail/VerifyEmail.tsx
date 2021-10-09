import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./Verify.style";
import { Api } from "../../api/index";


const verifyApi = Api.getSingleton();

interface Props {
  token: string | null;
}

const VerifyEmail: React.FC<Props> = ({ token }) => {
  const classes = useStyles();

  const verifyEmail = async (token: string) => {
    const res = await verifyApi.verifyEmail(token);
    return res;
  };

  useEffect(() => {
    const registerToken = localStorage.getItem("csrfltoken");
    if (token !== null) {
      const res = verifyEmail(token);
      console.log(res);
    }
  }, [token]);

  return (
    <Container className={classes.verify}>
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
        mt={2}
        width='100%'
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        {token === null ? (
          <Typography component='div'>
            <Box fontSize='h5.fontSize' textAlign='center'>
              Please check you inbox and click on the verification link.{" "}
              <Box>❤️ As usual.</Box>
            </Box>
          </Typography>
        ) : (
          <Typography component='div'>
            <Box textAlign='center' mb={5}>
              <CircularProgress color='secondary' />
            </Box>
            <Box fontSize='h5.fontSize' textAlign='center'>
              Thank you very much you are being logged in. 🚀
            </Box>
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
