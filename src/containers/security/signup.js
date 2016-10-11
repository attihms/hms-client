import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as actionCreators from '../../actions';

class Signup extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.renderErrorMessages = this.renderErrorMessages.bind(this);

    this.state = {
      email: '',
      password: '',
      errors: []
    }
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit() {
    const {
      email,
      password
    } = this.state;
    const creds = {
      email: email.trim(),
      password: password.trim()
    };

    this.props.signup(creds)
      .then(res => {
        if (res.type !== actionCreators.REGISTER_FAILURE) {
          browserHistory.replace('/login');
        } else {
          this.setState({
            errors: res.payload.message
          });
        }
      });
  }

  renderErrorMessages(errors) {
    let messages = [];
    for (var i in errors) {
      messages.push(<p key='`error-${i}`'>{ errors[i].message }</p>);
    }
    return messages;
  }

  render() {
    const {
      email,
      password,
      errors
    } = this.state

    return (
      <div>
        <h1>Create an Account</h1>
        <TextField
            floatingLabelText='Email'
            hintText='Email'
            fullWidth={true}
            name='email'
            value={ email }
            onChange={ this.handleEmailChange }
        />
        <TextField
            type='password'
            floatingLabelText='Password'
            hintText='Password'
            fullWidth={true}
            name='password'
            value={ password }
            onChange={ this.handlePasswordChange }
        />
        <RaisedButton primary={true}
            type='button'
            label='Signup'
            onClick={ this.handleSubmit }
        />
        { this.renderErrorMessages(errors) }
      </div>
    )
  }
}

export default connect(null, actionCreators)(Signup)
