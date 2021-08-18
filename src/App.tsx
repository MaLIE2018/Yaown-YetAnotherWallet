import { useEffect } from "react";
import { TopNav, BottomNav } from "./components/layout/navigation";
import { Wealth, Login, Cash, Registration, Overview, Future } from "./views";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "./store/types/types";
import Container from "@material-ui/core/Container";
import useStyles from "./App.styles";

function App({ history }: RouteComponentProps) {
  const classes = useStyles();
  const isAuthenticated = true;
  const { page } = useSelector((state: IRootState) => state);

  useEffect(() => {
    history.push(`/${page.present}`);
  }, [page.present]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Container disableGutters className={classes.root}>
      <TopNav />
      <Switch>
        <Route path='/wealth' component={Wealth} />
        <Route path='/overview' component={Overview} />
        <Route path='/future' component={Future} />
        <Route path='/cash' component={Cash} />
      </Switch>

      <BottomNav />
    </Container>
  );
}

export default withRouter(App);
