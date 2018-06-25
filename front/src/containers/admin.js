import React, { Component } from "react";
import styled from "styled-components";

import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import ArticlesEdition from "../containers/articlesEdition";
import ArticlesCreation from "../containers/articlesCreation";
import MenuAdmin from "../components/menuAdmin";

import { history } from "../config/store";

const AllContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

class Admin extends Component {
  render() {
    return (
      <AllContainer>
        <MenuAdmin />
        <ContentContainer>
          <ConnectedRouter history={history}>
            <Switch>
              <Route
                exact
                path="/admin/articles"
                render={() => <ArticlesEdition />}
              />
              <Route
                path="/admin/articles/create"
                render={() => <ArticlesCreation />}
              />
              <Route path="/admin/users" render={() => <ArticlesEdition />} />
              <Route
                path="/admin/annuaires"
                render={() => <ArticlesEdition />}
              />
            </Switch>
          </ConnectedRouter>
        </ContentContainer>
      </AllContainer>
    );
  }
}

export default Admin;
