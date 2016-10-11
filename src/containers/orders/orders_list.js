import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../actions';

import { Link } from 'react-router';
import { FormattedDate, FormattedTime } from 'react-intl';

import RaisedButton from 'material-ui/RaisedButton';
import SmartTable from '../../components/table/SmartTable';

class OrdersList extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

	componentWillMount() {
    const {
      token,
      fetchOrders
    } = this.props;

    if (token) {
      fetchOrders();
    }
	}

  componentWillUnmount() {}

	render() {
    let { orders } = this.props;

    const headerArr = [
      {alias: 'ID', dataAlias: 'id', format: {type: 'text'}},
      {alias: 'Name', dataAlias: 'lastName', format: {
        type: 'linkNameFormola', url: '/reservations/', names: ['title', 'firstName', 'lastName']}
      },
      {alias: 'Room Type', dataAlias: 'roomType', format: {type: 'text'}},
      {alias: 'Check In', dataAlias: 'checkIn', format: {type: 'dateTime'}},
      {alias: 'Check Out', dataAlias: 'checkOut', format: {type: 'dateTime'}}
    ];

    const tableConf = {
      tableHeaders: headerArr,
      data: orders.data,
      offset: 0,
      total: orders.total,
      limit: 10,
      onPageClick: this.goTo,
      config: {
        selectable: false,
        displaySelectAll: false,
        adjustForCheckbox: false,
        displayRowCheckbox: false,
        showRowHover: false,
        stripedRows: false
      }
    };

    return (
      <div>
        <SmartTable {...tableConf}>
          <Link to='/reservations/new'>
            <RaisedButton label="Add New Reservation" primary={true} />
          </Link>
        </SmartTable>
      </div>
    );

  //   let tableConfig = {
  //     height: 'calc(100vh - 200px)',
  //     fixedHeader: true,
  //     fixedFooter: true,
  //     selectable: true,
  //     multiSelectable: false
  //   }

  //   let headerConfig = {
  //     displaySelectAll: false,
  //     adjustForCheckbox: false,
  //     enableSelectAll: false,
  //   }

  //   let bodyConfig = {
  //     displayRowCheckbox: false,
  //     deselectOnClickaway: false,
  //     stripedRows: false,
  //     showRowHover: false
  //   }
	}
}

function mapStateToProps(state) {
  return {
    orders: state.orders.all,
    token: state.auth.token
  }
}

export default connect( mapStateToProps, { fetchOrders } )(OrdersList);
