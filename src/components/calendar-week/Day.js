import React, { Component } from 'react';

import styles from './Calendar.scss';

export default class Day extends Component {
    render() {
        const { day, startHour, hours, untilEnd } = this.props;

        if (hours === 24) {
            // full day reserved
            return <div className={styles.dayContiner}>
                <div className={styles.progress} style={{width: '100%'}}>{ hours }</div>
            </div>
        } else if (startHour === 0) {
            // reserved from the begining of the day
            let precent = `${(hours / 24) * 100}%`;
            return <div className={styles.dayContiner}>
                <div className={styles.progress} style={{width: precent}}>{ hours }</div>
            </div>
        } else if (hours && hours > 0 && untilEnd) {
            // reserved untill the end of the day
            let precent = `${(hours / 24) * 100}%`;
            return <div className={styles.dayContiner}>
                <div className={styles.progress} style={{width: precent, right: 0}}>{ hours }</div>
            </div>
        } else if (hours && hours > 0 && !untilEnd) {
            // reserved few hours in the day
            let precent = `${(hours / 24) * 100}%`;
            let precentEmptyStart = `${(startHour / 24) * 100}%`;
            return <div className={styles.dayContiner}>
                <div className={styles.progress} style={{width: precent, right: precentEmptyStart}}>{ hours }</div>
            </div>
        } else {
            // no reservation on this day
            return <div>FREE</div>
        }
    }
}