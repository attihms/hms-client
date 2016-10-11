import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions';

import { Link, browserHistory } from 'react-router';
import { FormattedDate, FormattedTime } from 'react-intl';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import NewRoomDialog from './room_new';
import SmartTable from '../../components/table/SmartTable';

import moment from 'moment';
import _ from 'lodash';

const RoomTypes = [
  {id: 1, name: 'Superior Double'},
  {id: 2, name: 'Superior Twin'},
  {id: 3, name: 'Luxury Double'},
  {id: 4, name: 'Luxury Twin'},
  {id: 5, name: 'Suite'}
];

const RoomStatus = [
  {id: 1, name: 'Free'},
  {id: 2, name: 'Occupied'}
];

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRoom: null
    };

    this.updateRoomDataTableHandler = this.updateRoomDataTableHandler.bind(this);
    this.onRowSelectionHandler = this.onRowSelectionHandler.bind(this);
  }

	componentWillMount() {
		this.props.fetchRooms();
	}

  componentWillUnmount() {}

  onRowSelectionHandler(roomObj) {
    if (roomObj) {
      this.setState({selectedRoom: roomObj});
    } else {
      this.setState({selectedRoom: null});
    }
  }

  updateRoomDataTableHandler() {
    this.props.fetchRooms();
  }

	render() {

    let { rooms } = this.props;

    let selectedRoom = this.state.selectedRoom;

    const headerArr = [
      {alias: 'ID', dataAlias: 'id', format: {type: 'text'}},
      {alias: 'Name', dataAlias: 'name', format: {type: 'text'}},
      {alias: 'Room Type', dataAlias: 'type', format: {type: 'option', names: RoomTypes, key: 'id', value: 'name'}},
      {alias: 'Status', dataAlias: 'status', format: {type: 'option', names: RoomStatus, key: 'id', value: 'name'}},
      {alias: 'Active/Inactive', dataAlias: 'active', format: {type: 'toggle'}}
    ];

    // const headerArr = [
    //   {alias: 'ID', dataAlias: 'id', format: {type: 'text'}},
    //   {alias: 'Name', dataAlias: 'lastName', format: {type: 'input', inputType: 'text'}},
    //   {alias: 'Room Type', dataAlias: 'roomType', format: {type: 'select', names: RoomTypes}},
    //   {alias: 'Status', dataAlias: 'status', format: {type: 'status'}},
    //   {alias: 'Active/Inactive', dataAlias: 'active', format: {type: 'toggle'}}
    // ];
    //
    // let rooms = [
    //   {id: 1, name: 101, roomType: 'Superior Twin', status: 1, active: true},
    //   {id: 2, name: 102, roomType: 'Superior Twin', status: 1, active: true},
    //   {id: 3, name: 103, roomType: 'Superior Twin', status: 1, active: true}
    // ];

    const tableConf = {
      tableHeaders: headerArr,
      data: rooms.data,
      offset: 0,
      total: rooms.total,
      limit: 10,
      onPageClick: this.goTo,
      onRowSelectionHandler: this.onRowSelectionHandler,
      config: {
        selectable: true,
        displaySelectAll: true,
        adjustForCheckbox: true,
        displayRowCheckbox: true,
        showRowHover: false,
        stripedRows: false
      }
    };

    return (
      <div>
        <SmartTable {...tableConf}>
          <NewRoomDialog roomData={selectedRoom} updateRoomDataTable={this.updateRoomDataTableHandler}/>
        </SmartTable>
      </div>
    );
	}
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.all,
    token: state.auth.token
  }
}

export default connect( mapStateToProps, { fetchRooms } )(Settings);
