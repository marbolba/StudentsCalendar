import React, { Component } from 'react';
import './DateCell.css'

/**
 * Props list:
 * date - Obj
 * type - {date,prev,next}
 */
class DateCell extends Component {
    onDateCellClick = () => {
        if (this.props.type === "date") {
            console.log(this.props.date)
        }
        else if (this.props.type === "prev")
            this.props.setPreviousMonth()
        else if (this.props.type === "next")
            this.props.setNextMonth()
    }
    renderContent = () => {
        if (this.props.type === "date")
            return (this.props.date.getDate())
        else if (this.props.type === "prev")
            return ("prev")
        else if (this.props.type === "next")
            return ("next")
    }
    render() {
        return (
            <div className='dateCell' onClick={this.onDateCellClick}>
                {this.renderContent()}
            </div>
        );
    }
}

export default DateCell;