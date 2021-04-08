import React, { ChangeEvent, FormEvent, memo, Suspense, useState } from "react";
import { useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { isApolloError, useMutation } from "@apollo/client";
import { svgs, feat1, feat2, feat3, feat4 } from "./assets";
import { motion } from "framer-motion";
import motionSettings from "./motionSettings";
import { AUTH_TOKEN, LOGIN } from "./client";
import { Button, DropDown, HeroGraphics, Feature, Input } from "./components";

const feature = [
  {
    className: "technology",
    svg: svgs.VectorChat(),
    title: "Technology Consulting",
    altText: "Technology Consulting",
    backgroundImg: feat1,
  },
  {
    className: "ux-engineering",
    svg: svgs.VectorPenTool(),
    title: "UX Engineering & UI Design",
    altText: "UX Engineering & UI Design",
    backgroundImg: feat2,
  },
  {
    className: "web-platform-dev",
    svg: svgs.VectorLayer(),
    title: "Web & Platform Development",
    altText: "Web & Platform Development",
    backgroundImg: feat3,
  },
  {
    className: "system-engineering",
    svg: svgs.VectorServer(),
    title: "System Engineering",
    altText: "System Engineering",
    backgroundImg: feat4,
  },
];

interface SloganProps {
  svgs: typeof svgs;
}

interface ErrorMessageProps {
  errorMessage: String;
}

interface FormProps {
  handleSubmitLogin: (e: FormEvent<Element>) => Promise<void>;
  credentials: {
    login: boolean;
    email: string;
    password: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputType: string;
  showPassword: () => void;
}

interface HeaderProps {
  svgs: typeof svgs;
}

interface FeatureProps {
  motionSettings: typeof motionSettings;
  feature: {
    className: string;
    svg: any;
    title: string;
    altText: string;
    backgroundImg: string;
  }[];
}

const Slogan = ({ svgs }: SloganProps) => {
  const { t } = useTranslation();

  return (
    <div className="slogan">
      <h3 className="slogan_label">
        <Trans components={{ italics: <i /> }}>login.message</Trans>
      </h3>
      <h4 className="slogan_message">{t("login.sub-message")}</h4>
      {svgs.DottedTexture()}
    </div>
  );
};

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => (
  <span style={{ width: "fit-content", height: "fit-content" }}>
    {errorMessage}
  </span>
);

const Form = ({
  handleSubmitLogin,
  credentials,
  handleChange,
  inputType,
  showPassword,
}: FormProps) => (
  <form className="form" onSubmit={handleSubmitLogin}>
    {Input({ credentials, handleChange, inputType, showPassword })}
    <Button label="Login" onClick={() => handleSubmitLogin} />
  </form>
);

const Header = ({ svgs }: HeaderProps) => (
  <div className="login__header">
    {svgs.ClientLogo()}
    <DropDown />
  </div>
);

const Features = ({ motionSettings, feature }: FeatureProps) => (
  <motion.div
    variants={motionSettings.variants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="features"
  >
    {feature.map(({ className, backgroundImg, altText, title, svg }, index) => (
      <Feature
        key={`feature-${index}`}
        className={className}
        svg={svg}
        title={title}
        altText={altText}
        backgroundImg={backgroundImg}
      />
    ))}
  </motion.div>
);

const LoginPage: React.FC = memo(() => {
  let history = useHistory();
  const [inputType, setInputType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    login: true,
    email: "",
    password: "",
  });

  const [login] = useMutation(LOGIN, {
    variables: {
      identifier: credentials.email,
      password: credentials.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.jwt);
      history.push("/account-page");
    },
    onError: (error) => {
      if (isApolloError(error)) {
        console.log(`Error`, error.graphQLErrors);
        for (const gqlError of error.graphQLErrors) {
          if (gqlError.extensions?.code === "INTERNAL_SERVER_ERROR") {
            setErrorMessage(`Wrong password or login credentials.`);
          } else {
            setErrorMessage(`There has been an error.`);
          }
        }
      }
    },
  });

  async function handleSubmitLogin(e: React.FormEvent) {
    e.preventDefault();
    if (credentials.login) {
      try {
        await login();
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  function showPassword() {
    setInputType(inputType === "text" ? "password" : "text");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div {...motionSettings.loginBody} className="login" key="login">
        <Header svgs={svgs} />
        {/* needs shadow under the header / intersection observer  */}
        <div className="border">
          <div className="mainteaser">
            <div className="mainteaser__intro">
              <Slogan svgs={svgs} />
              <ErrorMessage errorMessage={errorMessage} />
              <Form
                credentials={credentials}
                handleChange={handleChange}
                handleSubmitLogin={handleSubmitLogin}
                inputType={inputType}
                showPassword={showPassword}
              />
            </div>
            <HeroGraphics />
          </div>
          <Features feature={feature} motionSettings={motionSettings} />
        </div>
      </motion.div>
    </Suspense>
  );
});

export default LoginPage;
