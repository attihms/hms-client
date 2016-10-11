import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms, fetchSchedule } from '../../actions';

import { Link, browserHistory } from 'react-router';
import { FormattedDate, FormattedTime } from 'react-intl';

import Calendar from '../../components/calendar-week/Calendar';
import moment from 'moment';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
    };

    this.dateUpdateHandler = this.dateUpdateHandler.bind(this);
  }

	componentWillMount() {
		this.props.fetchRooms();
    let dateObj = this.getStartEnd(this.state.startDate);
    this.props.fetchSchedule(dateObj.start, dateObj.end);
	}

  componentWillUnmount() {}

  getStartEnd(date) {
    let start = date.clone().format('YYYY-MM-DD');
    let end = date.clone().add(6, 'd').format('YYYY-MM-DD');
    return {
      start,
      end
    }
  }

  dateUpdateHandler(newDate) {
    let dateObj = this.getStartEnd(this.state.startDate);
    this.props.fetchSchedule(dateObj.start, dateObj.end);
  }

  dayClickHandler(selectedDay, selectedRoom) {
    console.log('selectedDay', selectedDay.date.format('YYYY-MM-DD'));
    console.log('selectedRoom', selectedRoom);
  }

	render() {

    const { rooms, schedule } = this.props;
    const { startDate } = this.state;

    return (
      <div>
        <div style={{padding: 20}}>
          <Calendar
            selected={startDate}
            rooms={rooms}
            schedule={schedule}
            onDateUpdate={this.dateUpdateHandler}
            onDayClick={this.dayClickHandler}
          />
        </div>
      </div>
    );
	}
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.all,
    schedule: state.schedule.all,
    token: state.auth.token
  }
}

export default connect( mapStateToProps, { fetchRooms, fetchSchedule } )(Schedule);

