import React, { Component } from 'react';

import styles from './Calendar.scss';

export default class DayNames extends Component {
    render() {
        const startDate = this.props.startDate.clone();
        const day1 = startDate.clone().add(1, 'd');
        const day2 = startDate.clone().add(2, 'd');
        const day3 = startDate.clone().add(3, 'd');
        const day4 = startDate.clone().add(4, 'd');
        const day5 = startDate.clone().add(5, 'd');
        const day6 = startDate.clone().add(6, 'd');

        return <div className={ styles.week  + ' ' +  styles.names }>
            <span className={ styles.day }>Room<br />Name</span>
            <span className={ styles.day }>
                {startDate.format('ddd')}
                <br />
                {startDate.date()}
            </span>
            <span className={ styles.day }>
                {day1.format('ddd')}
                <br />
                {day1.date()}
            </span>
            <span className={ styles.day }>
                {day2.format('ddd')}
                <br />
                {day2.date()}
            </span>
            <span className={ styles.day }>
                {day3.format('ddd')}
                <br />
                {day3.date()}
            </span>
            <span className={ styles.day }>
                {day4.format('ddd')}
                <br />
                {day4.date()}
            </span>
            <span className={ styles.day }>
                {day5.format('ddd')}
                <br />
                {day5.date()}
            </span>
            <span className={ styles.day }>
                {day6.format('ddd')}
                <br />
                {day6.date()}
            </span>
        </div>;
    }
}