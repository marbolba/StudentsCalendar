import React, { Component } from 'react';
import './DateCell.css'
import ClassesIcon from '../../icon/classes.png'
import AddEvent from '../../icon/add-event.png'

/**
 * Props list:
 * date - Obj
 * type - {date,prev,next,current}
 */
class DateCell extends Component {
    onDateCellClick = () => {
        if (this.props.type === "date" || this.props.type === "current") {
            console.log(this.props.date)
        }
        else if (this.props.type === "prev")
            this.props.setPreviousMonth()
        else if (this.props.type === "next")
            this.props.setNextMonth()
    }
    renderContent = () => {
        if (this.props.type === "current"){   //the same
            return(          
                <div className='currentCell' onClick={this.onDateCellClick}>
                    <div className='header'>
                        <img src={ClassesIcon} alt="ClassesIcon"/>
                        <img src={AddEvent} alt="AddEvent"/>
                        <span>{this.props.date.getDate()}</span>
                    </div>
                </div>
        )}
        else if (this.props.type === "date"){
            return(        
                <div className='dateCell' onClick={this.onDateCellClick}>
                    <div className='header'>
                        <img src={ClassesIcon} alt="ClassesIcon"/>
                        <img src={AddEvent} alt="AddEvent"/>
                        <span>{this.props.date.getDate()}</span>
                    </div>
                </div>
        )}
        else if (this.props.type === "prev" || this.props.type === "next"){
            return(
                <div className='fadedCell' onClick={this.onDateCellClick}>
                    {null}
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