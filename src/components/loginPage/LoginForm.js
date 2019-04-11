import React from 'react';
import {Button, FormControl, Paper, Typography} from "@material-ui/core";
import styles from './loginForm.module.css';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

class LoginForm extends React.Component {
  state = {
    formData: {
      username: '',
      password: ''
    },
    loginErrorMsg:''
  };

  handleChange = (event) => {
    const {formData} = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({formData});
    this.setState({loginErrorMsg: ''});
  };

  userIsRegistered = (username) => {
    return ['Janko', 'Jozko', 'Johny'].includes(username);
  };

  passwordIsCorrect = (username, password) => {
    return username === password;
  }

  submit = () => {
    const { formData } = this.state;
    console.log(formData.username, formData.password);
    // TODO server.loginUser(userName, password)
    if(!this.userIsRegistered(formData.username)){
      this.setState({loginErrorMsg: 'User is not registered.'});
      return;
    }
    if(!this.passwordIsCorrect(formData.username, formData.password)){
      this.setState({loginErrorMsg: 'Password is incorrect.'});
    }
    else {
      this.props.history.push('/home/' + formData.username);
    }

  };

  render() {
    const {formData, loginErrorMsg} = this.state;
    return (
      <Paper className={styles["paper-login"]}>
        <Typography component="h1" variant="h5">Log in</Typography>
        <ValidatorForm ref="form" onSubmit={this.submit} onError={errors => console.log(errors)}>
          <FormControl margin="normal" required fullWidth>
            <TextValidator
              label="Username"
              onChange={this.handleChange}
              name="username"
              value={formData.username}
              validators={['required']}
              errorMessages={['Username is required.']}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextValidator
              label="Password"
              onChange={this.handleChange}
              name="password"
              value={formData.password}
              type="password"
              validators={['required']}
              errorMessages={['Password is required.']}/>
          </FormControl>
          <span className={styles["error-msg"]}>{loginErrorMsg}</span><br/><br/>
          <Button variant={"contained"} type="submit" className={styles.button}>Log in</Button>
        </ValidatorForm>
      </Paper>
    );
  }
}

export default LoginForm;
