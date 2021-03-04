import React from "react";
import { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";

import GlobalStyle, { theme } from "../baseStyles";
import LoginChecker from "../components/LoginChecker";
import Login from "./pages/login";
import Top from "./pages/top";

const App: React.SFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/login" component={Login} />
        <LoginChecker>
          <Route exact path="/" component={Top} />
        </LoginChecker>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
