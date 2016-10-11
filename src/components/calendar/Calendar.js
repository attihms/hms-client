import React, { PropTypes, Component } from 'react';

import DayNames from './DayNames';
import Week from './Week';

import ArrowLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ArrowRight from 'material-ui/svg-icons/navigation/chevron-right';

import styles from './Calendar.scss';

class Calendar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            month: this.props.selected.clone()
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.select = this.select.bind(this);
        this.renderWeeks = this.renderWeeks.bind(this);
    }

    previous() {
        var month = this.state.month;
        month.add(-1, 'M');
        this.setState({ month: month });
    }

    next() {
        var month = this.state.month;
        month.add(1, 'M');
        this.setState({ month: month });
    }

    select(day) {
        console.log(day);
        // this.setState({ month: {day: day.date} });
        this.props.selected = day.date;
        this.forceUpdate();
    }

    render() {
        return (
            <div className={ styles.calendar }>
                <div className={ styles.header }>
                    <i className={ styles.faAngleLeft} onClick={this.previous}>
                        <ArrowLeft />
                    </i>
                    {this.renderMonthLabel()}
                    <i className={ styles.faAngleRight} onClick={this.next}>
                        <ArrowRight />
                    </i>
                </div>
                <DayNames />
                {this.renderWeeks()}
            </div>
        );
    }

    renderWeeks() {
        var weeks = [],
            done = false,
            date = this.state.month.clone().startOf('month').add('w' -1).day('Sunday'),
            monthIndex = date.month(),
            count = 0;

        while (!done) {
            weeks.push(
                <Week 
                    key={date.toString()} 
                    date={date.clone()} 
                    month={this.state.month} 
                    select={this.select} 
                    selected={this.props.selected} />
                    );
            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    }

    renderMonthLabel() {
        return <span>{this.state.month.format('MMMM, YYYY')}</span>;
    }
}

export default Calendar;