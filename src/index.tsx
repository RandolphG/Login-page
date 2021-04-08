import React from "react";
import ReactDOM from "react-dom";
import "./styles/_styles.scss";
import AppRouter from "./AppRouter";
import { client } from "./client";
import { ApolloProvider } from "@apollo/client";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18next}>
        <AppRouter />
      </I18nextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
