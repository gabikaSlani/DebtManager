import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import styles from './loginForm.module.css'

const LoginPage = (props) => {

  return (
    <React.Fragment>
      <AppBar position="static" className={[styles.appBar, styles.paddinger].join(' ')}>
        <Toolbar className={styles.toolbar}>
          <h1 className={styles.title}>DEBT MANAGER</h1>
        </Toolbar>
      </AppBar>
      <div className={styles.paddinger}>
          <LoginForm {...props}/>
          <RegistrationForm/>
        </div>
    </React.Fragment>
  );
};

export default LoginPage;