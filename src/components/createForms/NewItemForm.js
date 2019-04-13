import React, {Component, Fragment} from 'react';

import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Button, FormControl} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormChips from "./formChips/FormChips";

import "./createForms.css";

class NewItemForm extends Component{

  state = {amount: '', description: ''};

  constructor(props) {
    super(props);
  }

  submit = () => {
    const {handleClose} = this.props;
    handleClose();
  };

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('number', (amount) => {
      return !isNaN(amount);
    });
  }

  render(){
    const {description, amount} = this.state;
    const {chips} = this.props;
    return(
      <ValidatorForm ref="form" onSubmit={this.submit} onError={errors => console.log(errors)}>
        <FormControl fullWidth required className="add-new-item-form-control">
          <TextValidator
            label="Description"
            onChange={this.handleChange('description')}
            name="description"
            value={description}
            validators={['required']}
            errorMessages={['Description is required.']}/>
        </FormControl>
        <FormControl fullWidth required className="add-new-item-form-control">
          <TextValidator
            label="Amount"
            onChange={this.handleChange('amount')}
            name="amount"
            value={amount}
            validators={['required', 'number']}
            errorMessages={['Amount is required.', 'Amount must be number.']}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"> € </InputAdornment>
              ),
            }}
          />
        </FormControl>
        {chips ? <FormChips/>: <Fragment/>}
        <Button variant={"contained"} type="submit" className="form-button">Submit</Button>
      </ValidatorForm>
    );
  }

}

export default NewItemForm;