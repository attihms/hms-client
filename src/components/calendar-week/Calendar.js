import React, { PropTypes, Component } from 'react';
import moment from 'moment';

import DayNames from './DayNames';
import Week from './Week';

import ArrowLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ArrowRight from 'material-ui/svg-icons/navigation/chevron-right';
import { white } from 'material-ui/styles/colors';

import styles from './Calendar.scss';

class Calendar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            week: this.props.selected.clone(),
            rooms: null,
            schedule: null
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.select = this.select.bind(this);
        this.renderWeeks = this.renderWeeks.bind(this);
        this.reselectSchedule = this.reselectSchedule.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let rooms = null;
        if (nextProps.rooms) {
          rooms = nextProps.rooms.data;
        }
        let schedule = null;
        if (nextProps.schedule) {
          schedule = nextProps.schedule.data;
        }
        this.setState({rooms, schedule});
    }

    previous() {
        var week = this.state.week;
        week.add(-1, 'w');
        this.setState({ week: week }, () => {
            this.props.onDateUpdate(this.state.week);
        });
    }

    next() {
        var week = this.state.week;
        week.add(1, 'w');
        this.setState({ week: week }, () => {
            this.props.onDateUpdate(this.state.week);
        });
    }

    select(day, room) {
        this.props.onDayClick(day, room);
        // this.setState({ month: {day: day.date} });
        // this.props.selected = day.date;
        // this.forceUpdate();
    }

    render() {
        const { rooms, schedule } = this.state;

        const startDate = this.state.week.clone();

        if(!_.isArray(rooms) || !_.isArray(schedule)) {
          return <div>Loading...</div>
        }

        return (
            <div className={ styles.calendar }>
                <div className={ styles.header }>
                    <i className={ styles.faAngleLeft} onClick={this.previous}>
                        <ArrowLeft color={ white }/>
                    </i>
                    {this.renderMonthLabel()}
                    <i className={ styles.faAngleRight} onClick={this.next}>
                        <ArrowRight color={ white } />
                    </i>
                </div>
                <DayNames startDate={startDate}/>
                {this.renderWeeks()}
            </div>
        );
    }

    reselectSchedule() {
        // TODO: extract ta a reselect later
        const { schedule } = this.state;
        if (!schedule) {
            return false;
        }

        let groupedByRooms = {};
        // grouping this week reservation by rooms
        schedule.map(val => {
            if (!groupedByRooms[val.roomId]) {
                groupedByRooms[val.roomId] = [];
            }
            groupedByRooms[val.roomId].push(val);
        });

        let roomObj = {};

        for (let [key, val] of groupedByRooms) {
            // loop through each room and sort the reservation of the week by hours
            val.sort(function (a, b) {
                return moment.utc(a.checkIn).diff(moment.utc(b.checkIn))
            });
            let obj = {};
            // map through the room reservation for the week
            val.map(v => {
                let ci = moment(v.checkIn);
                let co = moment(v.checkOut);
                let duration = moment.duration(co.minutes(0).seconds(0).diff(ci.minutes(0).seconds(0)));
                let hours = Math.ceil(duration.asHours());

                // create the first Day Data
                let isHoursFillTheDay = hours > (23 - ci.format('H')) ? true : false;
                obj[ci.date()] = {
                    startHour: parseInt(ci.format('H')),
                    hours: isHoursFillTheDay ? (23 - ci.format('H')) : (co.format('H') - ci.format('H')),
                    untilEnd: isHoursFillTheDay
                }

                if (obj[ci.date()].untilEnd) {
                    // the reservation continues to the next day 
                    hours = hours - obj[ci.date()].hours;
                    let counter = 1;
                    while (hours > 24) {
                        // while we over 24 hours the Day Data will have a full day (24 hours)
                        let counderDay = ci.clone().add(counter, 'day').hours(0).minutes(0).seconds(0);
                        obj[counderDay.date()] = {
                            startHour: 0,
                            hours: 24,
                            untilEnd: true
                        }
                        counter++;
                        hours = hours - obj[counderDay.date()].hours;
                    }
                    if (hours <= 24) {
                        // we have few hours left in the reservation, we add the last Day Date
                        let counderDay = ci.clone().add(counter, 'day').hours(0).minutes(0).seconds(0);
                        obj[counderDay.date()] = {
                            startHour: 0,
                            hours: (co.format('H') - counderDay.format('H')),
                            untilEnd: false
                        }
                    }
                }
            });
            // assign the room with the week reservation in a Day Data format
            roomObj[key] = obj;
        }

        return roomObj;
    }

    renderWeeks() {
        var weeks = [],
            done = false,
            date = this.state.week.clone(),
            rooms = this.state.rooms,
            monthIndex = date.week(),
            count = 0;

        const groupedByRooms = this.reselectSchedule();

        return rooms.map((room, index) => {
            if (!groupedByRooms[room.id]) {
                groupedByRooms[room.id] = {
                    startHour: null,
                    hours: null,
                    untilEnd: null
                };
            }
            return (
                <Week 
                    key={index} 
                    date={date.clone()} 
                    month={this.state.week} 
                    select={this.select}
                    room={room}
                    roomSchedule={groupedByRooms[room.id]}
                />
            );
        })

        return weeks;
    }

    renderMonthLabel() {
        return <span>
            {this.state.week.format('MMMM Do, YYYY')} - {this.state.week.clone().add(6, 'd').format('MMMM Do, YYYY')}
        </span>;
    }
}

export default Calendar;