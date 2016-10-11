import React, { PropTypes, Component } from 'react';

import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn,
  TableFooter } from 'material-ui/Table';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import SmartTableRow from './SmartTableRow';
import formatTableCell from './formatTableCell';

import _ from 'lodash';

import styles from './SmartTable.scss';

function sortFunc(a, b, key) {
  if (typeof(a[key]) === 'number') {
    return a[key] - b[key];
  }

  const ax = [];
  const bx = [];

  a[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { ax.push([$1 || Infinity, $2 || '']); });
  b[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { bx.push([$1 || Infinity, $2 || '']); });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

class SmartTable extends Component {

  // static childContextTypes = {
  //   muiTheme: React.PropTypes.object.isRequired
  // }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isAsc: false,
      sortHeader: null,
      paginatedData: null,
      offset: 0
    };

    this.onPageClick = this.onPageClick.bind(this);
    this._onRowSelection = this._onRowSelection.bind(this, this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data,
      paginatedData:  _.take(_.drop(props.data, props.offset), props.limit),
      offset: props.offset
    });
  }

  onPageClick(offset) {
    this.setState({
      paginatedData: _.take(_.drop(this.state.data, offset), this.props.limit),
      offset
    });
  }

  // getChildContext() {
  //   return { muiTheme: getMuiTheme() };
  // }

  sortByColumn(column, data) {
    const isAsc = this.state.sortHeader === column ? !this.state.isAsc : true;
    const sortedData = this.props.data.sort((a, b) => sortFunc(a, b, column));

    if (!isAsc) {
      sortedData.reverse();
    }

    this.setState({
      selectedRowArray: [],
      data: sortedData,
      paginatedData: _.take(_.drop(sortedData, 0), this.props.limit),
      offset: 0,
      sortHeader: column,
      isAsc
    });
  }

  _onRowSelection(props, rowNumber) {
    props.onRowSelectionHandler(this.state.paginatedData[rowNumber]);
    this.setState({selectedRowArray: rowNumber});
  }

  render() {
    const { limit, total, tableHeaders, config } = this.props;
    let { paginatedData, offset } = this.state;

    if(!_.isArray(paginatedData)) {
      return <div>Loading...</div>
    }

    // <SmartTableRow key={index} {...{ row, index, tableHeaders }} />

    return (
      <Table className={ styles.table } selectable={ config.selectable } onRowSelection={ this._onRowSelection }>
        <TableHeader displaySelectAll={ config.displaySelectAll } adjustForCheckbox={ config.adjustForCheckbox }>
          <TableRow>
            <TableHeaderColumn colSpan={ tableHeaders.length }>
              { this.props.children }
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            {!!tableHeaders && tableHeaders.map((header, index) => (
              <TableHeaderColumn key={ index }>
                <div className={ styles.rowAlign }>
                  {header.alias}
                  <SortIcon
                    id={header.dataAlias}
                    className={ styles.sortIcon }
                    onMouseUp={(e) => this.sortByColumn(e.target.id) }
                  />
                </div>
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody 
          showRowHover={ config.showRowHover } 
          stripedRows={ config.stripedRows } 
          displayRowCheckbox={ config.displayRowCheckbox }
          deselectOnClickaway={ !config.displayRowCheckbox }
        >
          { paginatedData.map((row, index) => (
              <TableRow key={index} selected={_.includes(this.state.selectedRowArray, index) }>
                {tableHeaders.map((header, propIndex) => (
                  <TableRowColumn key={propIndex}>
                    {formatTableCell(row[header.dataAlias], header.format, row)}
                  </TableRowColumn>
                ))}
              </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn>
                <div className={ styles.footerControls }>
                  { `${Math.min((offset + 1), total)} - ${Math.min((offset + limit), total)} of ${total}` }
                  <IconButton disabled={offset === 0} onClick={this.onPageClick.bind(null, offset - limit)}>
                    <ChevronLeft/>
                  </IconButton>
                  <IconButton disabled={offset + limit >= total} onClick={this.onPageClick.bind(null, offset + limit)}>
                    <ChevronRight/>
                  </IconButton>
                </div>
              </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

SmartTable.propTypes = {
  tableHeaders: PropTypes.array,
  data: PropTypes.array,
  offset: PropTypes.number, // current offset
  total: PropTypes.number, // total number of rows
  limit: PropTypes.number, // num of rows in each page
  onPageClick: PropTypes.func, // what to do after clicking page number
  config: PropTypes.object
};

export default SmartTable;
