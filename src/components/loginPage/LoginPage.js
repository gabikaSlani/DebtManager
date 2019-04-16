import React, {Fragment} from "react";
import LoginForm from "./forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import Header from "../mainComponents/header/Header";

import '../paddinger.css';

const LoginPage = (props) => {

  return (
    <Fragment>
      <Header logged={false}/>
      <div className="paddinger">
        <LoginForm {...props}/>
        <RegistrationForm/>
      </div>
    </Fragment>
  );
};

export default LoginPage;