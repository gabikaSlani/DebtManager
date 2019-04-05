import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import styles from './loginForm.module.css'

const LoginPage = (props) => {

  return (
    <React.Fragment>
      <AppBar position="static" className={styles["app-bar"]}>
        <Toolbar className={styles.toolbar}>
          <h1 className={styles.title}>DEBT MANAGER</h1>
        </Toolbar>
      </AppBar>
      <div className={styles["align-center"]}>
        <div className={styles["fix-width"]}>
          <LoginForm {...props}/>
          <h2 className={styles["white-text"]}>OR</h2>
          <RegistrationForm/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;