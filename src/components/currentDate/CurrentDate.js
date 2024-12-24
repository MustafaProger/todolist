import React, { Component } from 'react';
import './CurrentDate.scss'

class CurrentDate extends Component {
    state = {
        date: new Date()
    };

    render() {
        const { date } = this.state;
        const dateArr = date.toDateString().split(' ');

        return (
            <div>
                <h3>{dateArr[2]} {dateArr[1]} • {dateArr[0]}</h3>
            </div>
        );
    }
}

export default CurrentDate;