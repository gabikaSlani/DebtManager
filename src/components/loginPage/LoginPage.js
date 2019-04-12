import React from "react";
import LoginForm from "./forms/LoginForm";
import RegistrationForm from "./forms/RegistrationForm";
import Header from "../mainComponents/header/Header";

import '../paddinger.css';

const LoginPage = (props) => {

  return (
    <React.Fragment>
      <Header logged={false}/>
      <div className="paddinger">
        <LoginForm {...props}/>
        <RegistrationForm/>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;