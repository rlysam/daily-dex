import { Backdrop, CircularProgress, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


function LoadingPage(props) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

