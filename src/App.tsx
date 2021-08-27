import { useEffect, Suspense } from "react";
import { TopNav, BottomNav } from "./components/layout/navigation";
import {
  Wealth,
  Login,
  Cash,
  Overview,
  Future,
  RenderLoader,
  VerifyEmail,
} from "./views";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import useStyles from "./App.styles";
import Tracker from "./components/tracker/Tracker";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Page from "components/layout/page/Page";
import useSelector from "hooks/useSelector";
import { useDispatch } from "hooks/useDispatch";
import AddAccount from "components/addBank/AddAccount";
import { Api } from "../src/api/index";
import Cookies from "js-cookie";

function App({ history, location, match }: RouteComponentProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page, showAddBankPage } = useSelector((state) => state);
  const isAuthenticated = Api.getSingleton().isLoggedIn();

  useEffect(() => {
    history.push(`/${page.present}`);
  }, [page.present]);

  useEffect(() => {
    document.addEventListener("visibilitychange", function (event) {
      if (document.hidden) {
        Api.getSingleton().logout();
        console.log("not visible");
      } else {
        console.log("is visible");
      }
    });
    return document.removeEventListener("visibilitychange", function (event) {
      if (document.hidden) {
        console.log("not visible");
      } else {
        console.log("is visible");
      }
    });
  }, []);

  if (!isAuthenticated) {
    const token = new URLSearchParams(location.search).get("token");
    if (Cookies.get("csrfltoken")) {
      return <VerifyEmail token={token} />;
    } else if (token !== null) {
      return <VerifyEmail token={token} />;
    }
    return <Login />;
  }

  return (
    <Suspense fallback={<RenderLoader />}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Container disableGutters className={classes.root}>
          <TopNav />
          <Switch>
            <Route path='/wealth' component={Wealth} />
            <Route path='/overview' component={Overview} />
            <Route path='/future' component={Future} />
            <Route path='/cash' component={Cash} />
            <Redirect from='*' to='/' />
            <Route render={() => <h1>404: page not found</h1>} />
          </Switch>

          <BottomNav />
          <Tracker />
          {showAddBankPage && (
            <Page
              render={<AddAccount />}
              title='Select Bank'
              togglePage={() => dispatch({ type: "TOGGLE_ADD_BANK_PAGE" })}
            />
          )}
        </Container>
      </MuiPickersUtilsProvider>
    </Suspense>
  );
}

export default withRouter(App);
