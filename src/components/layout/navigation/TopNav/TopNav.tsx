import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './TopNav.styles';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store/types/types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';
import { t } from 'i18n-js';
import { Api } from '../../../../api/index';
import LinearProgress from '@mui/material/LinearProgress';

const TopNav: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const { page } = useSelector((state: IRootState) => state);
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const api = Api.getSingleton();

  const refresh = async () => {
    try {
      if (page.present === 'wealth') { 
        setLoading(true)
        const res = await api.getBalances();
        if (res) {
          await api.getMyAccounts();
        }
      }else if (page.present === 'overview'){
          setLoading(true)
          await api.getTransactions()
      }
      setLoading(false)
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className={classes.topNav}>
      <AppBar position='static'>
     
        <Toolbar variant='dense'>
          {page.present !== 'cash' && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              onClick={() => {
                history.goBack();
                dispatch({ type: 'NAVIGATION_BACK' });
              }}
              aria-label='back'>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Typography variant='h6' color='inherit'>
            {t(`navigation.${page.present}`)}
          </Typography>
          {(page.present === 'overview' || page.present === 'wealth') && (
            <IconButton className={classes.refBtn} onClick={() => refresh()}>
              <RefreshIcon />
            </IconButton>
          )}
          {page.present === 'wealth' && (
            <IconButton className={classes.addBtn} onClick={() => dispatch({ type: 'TOGGLE_ADD_ASSET_MODAL' })}>
              <AddIcon />
            </IconButton>
          )}
        </Toolbar>
        {loading && <LinearProgress color="inherit" />}
        
      </AppBar>
    </div>
  );
};

export default withRouter(TopNav);
