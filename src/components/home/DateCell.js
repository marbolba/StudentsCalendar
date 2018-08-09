import React, { Component } from 'react';
import './DateCell.css'

/**
 * Props list:
 * date - Obj
 * type - {date,prev,next,current}
 */
class DateCell extends Component {
    onDateCellClick = () => {
        if (this.props.type === "date"||this.props.type === "current") {
            console.log(this.props.date)
        }
        else if (this.props.type === "prev")
            this.props.setPreviousMonth()
        else if (this.props.type === "next")
            this.props.setNextMonth()
    }
    renderContent = () => {
        if (this.props.type === "current"){return(          //the same
            <div className='currentCell' onClick={this.onDateCellClick}>
                {this.props.date.getDate()}
            </div>
        )}
        else if (this.props.type === "date"){return(        //the same
            <div className='dateCell' onClick={this.onDateCellClick}>
                {this.props.date.getDate()}
            </div>
        )}
        else if (this.props.type === "prev"){return(
            <div className='fadedCell' onClick={this.onDateCellClick}>
            </div>
        )}
        else if (this.props.type === "next"){return(
            <div className='fadedCell' onClick={this.onDateCellClick}>
            </div>
        )}
    }
    render() {
        return (
                this.renderContent()
        );
    }
}

export default DateCell;