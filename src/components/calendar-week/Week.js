import React, { Component } from 'react';
import moment from 'moment';

import Day from './Day';

import styles from './Calendar.scss';

export default class Week extends Component {
    render() {
        var days = [],
            date = this.props.date,
            month = this.props.month,
            room = this.props.room;

        const { roomSchedule } = this.props;

        days.push(<span key={room.id} className={styles.day}>{room.name}</span>);

        for (var i = 0; i < 7; i++) {
            var day = {
                name: date.format('dd').substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), 'day'),
                date: date
            };
            
            let bookingHours = {
                startHour: null,
                hours: null,
                untilEnd: null
            };
            if (roomSchedule && roomSchedule[day.number]) {
                bookingHours = roomSchedule[day.number];
            }

            days.push(
                <span key={day.date.toString()} 
                    className={styles.day + ' ' + (day.isToday ? styles.today : '')} 
                    onClick={this.props.select.bind(null, day, room)}
                >
                    <Day day={day} {...bookingHours}/>
                </span>
            );
            
            date = date.clone();
            date.add(1, 'd');
        }

        return <div className={ styles.week } key={days[0].toString()}>
            {days}
        </div>
    }
}