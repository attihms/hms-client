// import numeral from 'numeral';
import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedTime } from 'react-intl';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';

const dateFormat = {
  year: 'numeric',
  month: 'short',
  day: '2-digit'
}
const timeFormat = {
  hour12: false,
  hour: 'numeric',
  minute: 'numeric'
}

export default (cell, format, row) => {
  switch (format && format.type) {
    case 'link':
      return <Link to={ `${format.url}${row.id}` }>{ cell }</Link>;
    case 'linkNameFormola':
      return <Link to={ `${format.url}${row.id}` }>{ format.names.map((val, idx) => {
        return <span key={idx}>{row[val]} </span>;
      })}</Link>;
    case 'percentage':
      return `${cell}%`;
    case 'dateTime':
      return <span>
        <FormattedDate value={cell} {...dateFormat}/>
        <b>&nbsp;&nbsp;<FormattedTime value={cell} {...timeFormat}/></b>
      </span>;
    // case 'money':
    //   return numeral(cell).format('0,0');
    case 'option':
      return <span>
        {_.find(format.names, [format.key, parseInt(cell)])[format.value]}
      </span>
    case 'input':
      return <span>
        <TextField name={`input_${row.id}`} type={format.inputType} defaultValue={cell} />
      </span>;
    case 'toggle':
      return <span>
        <Toggle
          label={cell ? 'Active' : 'Inactive'}
          defaultToggled={cell ? true : false}
          labelPosition="right"
          disabled={true}
        />
      </span>;
    case 'status':
      return <span>
        {
          cell ?
          <span style={{lineHieght: 2}}><AvPlayArrow/> <span>Free</span></span> :
          <span style={{lineHieght: 2, color: 'red'}}><AvPause /> <span>Occupied</span></span>
        }
      </span>;
    case 'select':
      return <DropDownMenu value={cell}>
        {format.names.map((val, idx) => <MenuItem key={val.id} value={val.name} primaryText={val.name} />)}
      </DropDownMenu>
    default:
      return cell;
  }
};