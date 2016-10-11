import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      isAuthenticated,
      currentURL
    } = this.props;

    if (!isAuthenticated) {
      browserHistory.replace('/');
    }
  }

  render() {
    const {
      isAuthenticated
    } = this.props;

    if (isAuthenticated) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

function mapStateToProps(state, ownProps) {
  const {
    auth: {
      isAuthenticated
    }
  } = state;

  return {
    isAuthenticated: isAuthenticated,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)
