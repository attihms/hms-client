import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchOrder, deleteOrder, clearOrder } from '../../actions';

import { Grid, Row, Col } from 'react-flexbox-grid/lib';

import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';

import formatTableCell from '../../components/table/formatTableCell';

import styles from '../general.scss';

class OrderView extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);

    this.state = { loading: true };
  }

  componentWillMount() {
    const {
      token,
      fetchOrder,
      params
    } = this.props;

    if (token && params.id) {
      fetchOrder(params.id)
        .then( () => this.setState({ loading: false }) );
    }
  }

  componentWillUnmount() {
    this.props.clearOrder();
  }

  renderBarLeftIcon() {
    return (
      <IconButton iconStyle={{color: '#fff'}} onClick={browserHistory.goBack}>
        <NavigationBack/>
      </IconButton>
    )
  }

  renderBarRightIcon(editId) {
    return (
      <div style={{marginTop: '5px'}}>
        <FlatButton label="Delete" onClick={this.onDeleteClick.bind(this)} style={{color: '#fff'}}/>
        <Link to={`/reservations/${editId}/edit`}>
          <FlatButton label="Edit" style={{color: '#fff'}}/>
        </Link>
      </div>
    )
  }

  onDeleteClick() {
    this.props.deleteOrder(this.props.params.id)
      .then( () => {
        this.context.router.push('/reservations/overview');
      })
  }

  render() {
    const { order } = this.props;

    if(this.state.loading) {
      return <div>Loading....</div>
    }

    let orderBarTitle = `Reservation #${order.id}`;

    let disableForm = true;

    return (
      <div>
        <AppBar
          title={orderBarTitle}
          iconElementLeft={this.renderBarLeftIcon()}
          iconElementRight={this.renderBarRightIcon(this.props.params.id)}
        />
        <div className={ styles.markdownBody } style={{padding: '50px 20px'}}>
          <Row>
            <Col xs={12}>
              <Row end="xs">
                <Col xs={6}>
                  <i><b>Last Updated At:</b> { formatTableCell(order.updated_at, {type: 'dateTime'}) }</i>
                </Col>
              </Row>
            </Col>
          </Row>

          <h2>User Information</h2>
          <Row>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Title"
                hintText="The title of the customer"
                defaultValue={order.title}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="First Name"
                hintText="The title of the customer"
                defaultValue={order.firstName}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Last Name"
                hintText="The title of the customer"
                defaultValue={order.lastName}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Middle Name"
                hintText="The title of the customer"
                defaultValue={order.middleName}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} sm={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Nationality"
                hintText="The title of the customer"
                defaultValue={order.nationality}
                fullWidth={true}
              />
            </Col>
          </Row>
          <br />

          <h2>Order Information</h2>
          <Row>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Check In Date"
                hintText="The title of the customer"
                defaultValue={order.checkIn}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Check Out Date"
                hintText="The title of the customer"
                defaultValue={order.checkOut}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Booking Source"
                hintText="The title of the customer"
                defaultValue={order.bookingSource}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Room Type"
                hintText="The title of the customer"
                defaultValue={order.roomType}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Number Of Room"
                hintText="The title of the customer"
                defaultValue={order.numberOfRoom}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Number Of Person"
                hintText="The title of the customer"
                defaultValue={order.numberOfPerson}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Enfant"
                hintText="The title of the customer"
                defaultValue={order.enfant}
                fullWidth={true}
              />
            </Col>
          </Row>
          <br />

          <h2>Payment Bill</h2>
          <Row>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Price"
                hintText="The title of the customer"
                defaultValue={order.price}
                fullWidth={true}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <TextField
                disabled={disableForm}
                floatingLabelText="Payment Method"
                hintText="The title of the customer"
                defaultValue={order.paymentMethod}
                fullWidth={true}
              />
            </Col>
          </Row>
          <br />

          <h2>Aditnal Information</h2>
          <Row>
            <Col xs={12}>
              <TextField
                  disabled={disableForm}
                  floatingLabelText="Special Request"
                  hintText="The title of the customer"
                  defaultValue={order.specialRequest}
                  fullWidth={true}
                  multiLine={true}
                  rows={1}
                  rowsMax={4}
                />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    order: state.orders.order,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { fetchOrder, deleteOrder, clearOrder })(OrderView);
