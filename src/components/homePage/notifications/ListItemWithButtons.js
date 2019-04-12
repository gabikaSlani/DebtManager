import React, {Component, Fragment} from 'react';
import {Divider, IconButton, ListItem, ListItemText} from "@material-ui/core";
import {Cancel, CheckCircle} from "@material-ui/icons";


import ListItemWithText from "./ListItemWithText";

class ListItemWithButtons extends Component {

  constructor(props) {
    super(props);

    const {messageType, messageText} = props;

    this.state = {
      type: messageType,
      text: messageText,
      clicked: false
    }
  };

  accept = () => {
    const messageText = (this.state.type === 'friendship')
      ? 'akcetovane priatelstvo'
      : 'potvrdena platba';
    this.setState({text: messageText});
    this.setState({clicked: true});

    //TODO nastav na serveri
  };

  reject = () => {
    const messageText = (this.state.type === 'friendship')
      ? 'neakceptovane priatelstvo'
      : 'nepotvrdena platba';
    this.setState({text: messageText});
    this.setState({clicked: true});

    //TODO nastav na serveri
  };

  render() {
    const {text, clicked} = this.state;
    return (
      <Fragment>
        {clicked ?
          <ListItemWithText text={text}/>
          :
          <Fragment>
            <ListItem className="notification-list-item">
              <ListItemText
                primary={text}
                className="notification-list-item-text"
              />
              <div className="notification-list-item-buttons">
                <IconButton aria-label="Check" className="notification-list-item-button" onClick={this.accept}>
                  <CheckCircle/>
                </IconButton>
                <IconButton aria-label="Delete" className="notification-list-item-button" onClick={this.reject}>
                  <Cancel/>
                </IconButton>
              </div>
            </ListItem>
            <Divider/>
          </Fragment>
        }
      </Fragment>
    );
  };
}

export default ListItemWithButtons;