import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAsset: {
      height: '90vh',
      '& li .MuiTypography-root:first-child': {
        flexGrow: 1,
      },
      '& li .MuiFormControl-root:last-child': {
        flexGrow: 2,
      },
      '& .MuiListItem-root': {
        justifyContent: 'space-between',
       
      },
      '& .MuiTextField-root': {
        width: '100%',
      },
    },
  })
);

export default useStyles;
