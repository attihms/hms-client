import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createOrder, fetchOrder, editOrder, clearOrder } from '../../actions';

import _ from 'lodash';
import { Row, Col } from 'react-flexbox-grid/lib';

import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui'

import formatTableCell from '../../components/table/formatTableCell';

import { FIELDS_USER, FIELDS_ORDER, FIELDS_BILL } from './order_fields';

import styles from '../general.scss';

class OrderNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);

    this.state = { 
      loading: this.props.params.id ? true : false,
      order: null
    };

    this.renderField = this.renderField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const {
      token,
      fetchOrder,
      params
    } = this.props;

    if (token && params.id) {
      fetchOrder(params.id)
        .then(res => this.setState({
          loading: false,
          order: res.payload.data
        }));
    }
  }

  componentWillUnmount() {
    this.props.clearOrder();
  }

  onSubmit(formProps) {
    if (this.props.params.id) {
      this.props.editOrder(this.props.params.id, formProps)
        .then( () => {
          this.context.router.push('/');
        });
    } else {
      this.props.createOrder(formProps)
        .then( () => {
          this.context.router.push('/');
        });
    }
  }

  renderField(fieldConfig, field)  { // val, key
    let fieldElement = '';

    switch (fieldConfig.type) {
      case 'input': 
        //defaultValue={fieldHelper.defaultValue || ''}
        fieldElement = (
          <Field
            name={field}
            component={TextField}
            hintText={fieldConfig.hint}
            floatingLabelText={fieldConfig.label}
            fullWidth={true}
          />
        )
        break;
      case 'select': 
        fieldElement = (
          // value={fieldHelper.value}
          <Field
            name={field}
            component={SelectField}
            floatingLabelText={fieldConfig.label}
            fullWidth={true}
          >
            {_.map( fieldConfig.options, (item) => {
              return <MenuItem key={item.id} value={item.id} primaryText={item.name} />
            })}
          </Field>
        )
        break;
      case 'textarea': 
        fieldElement = ('<span>NONE</span>');
        break;
      default:
        fieldElement = ('<span>NONE</span>');
        break;
    }

    return (
      <Col xs={12} sm={6} md={3} key={field}>
        { fieldElement }
      </Col>
    );
  }

  renderBarLeftIcon() {
    return (
      <IconButton iconStyle={{color: '#fff'}} onClick={browserHistory.goBack}>
        <NavigationBack/>
      </IconButton>
    )
  }

  renderBarRightIcon(editId) {
    let saveLabel = editId ? 'Save' : 'Create';
    return (
      <div style={{marginTop: '5px'}}>
        <FlatButton label="Delete" onClick={this.onDeleteClick.bind(this)} style={{color: '#fff'}}/>
        <FlatButton label={saveLabel} onClick={this.props.handleSubmit(this.onSubmit)} style={{color: '#fff'}}/>
      </div>
    )
  }

  onDeleteClick() {
    if (this.props.params.id) {
      this.props.deleteOrder(this.props.params.id)
        .then( () => {
          this.context.router.push('/reservations/overview');
        })
      } else {
        this.context.router.push('/reservations/overview');
      }
  }

	render() {

    if(this.state.loading) {
      return <div>Loading....</div>
    }

    const editMode = this.props.params.id ? true : false;
    
    const { handleSubmit, pristine, reset, submitting } = this.props;

    const { order } = this.state;

    const orderBarTitle = editMode ? `Reservation #${this.props.params.id}` : `New Reservation`;

		return (
      <div>
        <AppBar 
          title={orderBarTitle} 
          iconElementLeft={this.renderBarLeftIcon()}
          iconElementRight={this.renderBarRightIcon(this.props.params.id)}
        />
        <form className={ styles.markdownBody } style={{padding: '50px 20px'}}
              onSubmit={ handleSubmit( this.onSubmit ) }>

          { editMode && order && order.updated_at ? <Row>
            <Col xs={12}>
              <Row end="xs">
                <Col xs={6}>
                  <i><b>Last Updated At:</b> { formatTableCell(order.updated_at, {type: 'dateTime'}) }</i>
                </Col>
              </Row>
            </Col>
          </Row> : '' }

          <h2>User Information</h2>
          <Row>
            {_.map( FIELDS_USER, this.renderField )}
          </Row>
          <br />

          <h2>Order Information</h2>
          <Row>
            {_.map( FIELDS_ORDER, this.renderField )}
          </Row>
          <br />

          <h2>Payment Bill</h2>
          <Row>
            {_.map( FIELDS_BILL, this.renderField )}
          </Row>

          <br />
          <RaisedButton primary={true}  type='submit' label={ editMode ? 'Save Changes' : 'Create New' }/>
        </form>
      </div>
		);
	}
}

function validate(values) {
  const errors = {};

  let totalFields = _.concat([], FIELDS_USER, FIELDS_ORDER, FIELDS_BILL);

  _.each(totalFields, (type, field) => {
    if(!values[field]){
      errors[field] = `Please enter a ${field}`;
    }
  })

  return errors;
}

function mapStateToProps(state) {
  return {
    initialValues: state.orders.order,
    token: state.auth.token
  }
}

OrderNew = reduxForm({
  form: 'OrderNewForm',
  validate
})(OrderNew)

OrderNew = connect(
  mapStateToProps,
  { createOrder, fetchOrder, editOrder, clearOrder }
)(OrderNew)

export default OrderNew
