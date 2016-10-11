import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Nav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  renderBarRightIcon() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    )
  }

  render() {

    let buttonStyle = {
      color: 'rgba(0, 0, 0, 0.8)',
      textDecoration: 'none'
    }

    let title = 'Hotel Managmet System'

    console.dir(this.props);

    switch (this.props.location.pathname) {
      case '/reservations/overview':
        title = 'Reservations Overview';
        break;
      case '/room_management/settings':
        title = 'Rooms Settings';
        break;
      case '/room_management/schedule':
        title = 'Rooms Schadule';
        break;
    }

    return (
      <div>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={ this.renderBarRightIcon() }
        />
        <Drawer open={this.state.open}>
          <AppBar
            title='HMS'
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <MenuItem>
            <Link to={`/reservations/overview`} style={buttonStyle}>
              Reservations
            </Link>
          </MenuItem>
          <MenuItem>
            Room Management
            <MenuItem>
              <Link to={`/room_management/schedule`} style={buttonStyle}>
                Schadule
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/room_management/settings`} style={buttonStyle}>
                Settings
              </Link>
            </MenuItem>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Nav;
