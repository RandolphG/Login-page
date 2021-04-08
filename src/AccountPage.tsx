import React, { memo, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { svgs } from "./assets";
import { motion } from "framer-motion";
import motionSettings from "./motionSettings";
import {
  Button,
  DropDown,
  HeroGraphics,
  AccountPageInputfield,
} from "./components";
import { AUTH_TOKEN, GET_USER } from "./client";
import { useQuery } from "@apollo/client";

const AccountPage: React.FC = memo(() => {
  const { data, loading, error } = useQuery(GET_USER);

  let errorMessage: string | undefined;

  if (error) {
    if (
      error.networkError &&
      typeof window !== "undefined" &&
      !window.navigator.onLine
    ) {
      errorMessage = "Browser is offline.";
    } else {
      for (const gqlError of error.graphQLErrors) {
        if (gqlError.path?.join(".") === "user") {
          errorMessage = gqlError.message;
        }
      }
      if (!errorMessage) {
        errorMessage = "An error occurred.";
      }
    }
  }

  let history = useHistory();
  const { t } = useTranslation();

  const goToHome = () => {
    console.log("logout");
    history.push("/");
    localStorage.removeItem(AUTH_TOKEN);
  };

  return (
    <Suspense fallback="loading">
      <motion.div {...motionSettings.loginBody} className="login" key="login">
        <div className="login__header">
          {svgs.ClientLogo()}
          <DropDown />
        </div>
        <div className="border">
          <div className="mainteaser">
            <div className="mainteaser__intro">
              <div className="slogan">
                <h3 className="slogan_label">
                  <Trans>account.message</Trans>
                </h3>
                <h4 className="slogan_message">
                  <Trans
                    components={{
                      style: <span className="slogan_message_email" />,
                    }}
                  >
                    account.sub-message
                  </Trans>
                </h4>
                {svgs.DottedTexture()}
              </div>
              <form className="form" onSubmit={() => console.log(`nothing`)}>
                {loading ? (
                  <div>Loading...</div>
                ) : errorMessage ? (
                  <motion.div {...motionSettings.dropDown}>
                    {errorMessage}
                  </motion.div>
                ) : null}
                {data && data.user ? (
                  <AccountPageInputfield user={data.user} />
                ) : (
                  <div>No data to display</div>
                )}
                <Button onClick={goToHome} label="logout" />
              </form>
            </div>
            <HeroGraphics />
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
});

export default AccountPage;
