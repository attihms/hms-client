import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

class LandingPage extends Component {
  constructor(props){
    super(props);

    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToSignup = this.redirectToSignup.bind(this);
  }

  redirectToLogin() {
    browserHistory.replace("/login");
  }

  redirectToSignup() {
    browserHistory.replace("/signup");
  }

  render() {

    return (
      <div>
        <RaisedButton primary={true}
            type='button'
            label='Login'
            onClick={ this.redirectToLogin }
        />
        <RaisedButton
            type='button'
            label='Signup'
            onClick={ this.redirectToSignup }
        />
      </div>
    )
  }
}

export default LandingPage
