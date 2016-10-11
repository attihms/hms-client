import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as actionCreators from '../../actions';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email: '',
      password: ''
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

    this.props.login(creds)
      .then(res => {
        browserHistory.replace("/reservations/overview");
      });
  }

  render() {
    const {
      email,
      password
    } = this.state

    return (
      <div>
        <h1>Welcome Back</h1>
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
            label='Login'
            onClick={ this.handleSubmit }
        />
      </div>
    )
  }
}

export default connect(null, actionCreators)(Login)
