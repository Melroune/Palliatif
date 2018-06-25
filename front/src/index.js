import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import Home from "./containers/home";
import Login from "./containers/login";
import ArticlesEdition from "./containers/articlesEdition";
import Admin from "./containers/admin";
import News from "./containers/news";

import { history, store } from "./config/store";
import theme from "./config/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/admin" render={() => <Admin />} />
          <Route path="/news"  render={() => <News/>}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
