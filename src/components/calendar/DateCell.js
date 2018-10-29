import React, { Component } from 'react';
import './DateCell.css';
import AddEvent from '../../icon/add-event.png';
import Exit from '../../icon/exit.png';
import Modal from 'react-modal';
import ModalClassesContent from './modal_content/ModalClassesContent';

/**
 * Props list:
 * date - Obj
 * type - {date,prev,next,current,weekend}
 */
class DateCell extends Component {
    state = {
        isModalOpen: false
    }
    componentWillMount() {
        Modal.setAppElement('body');
    }
    toggleModalOpen = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    onDateCellClick = () => {
        if (this.props.type === "date" || this.props.type === "current" || this.props.type === "weekend") {
            this.toggleModalOpen()
        }
        else if (this.props.type === "prev")
            this.props.setPreviousMonth()
        else if (this.props.type === "next")
            this.props.setNextMonth()
    }
    renderContent = () => {
        if (this.props.type === "current") {   //the same
            return (
                <div className='currentCell' onClick={this.onDateCellClick}>
                    {this.renderDateContent()}
                </div>
            )
        }
        else if (this.props.type === "date") {
            return (
                <div className='dateCell' onClick={this.onDateCellClick}>
                    {this.renderDateContent()}
                </div>
            )
        }
        else if (this.props.type === "weekend") {
            return (
                <div className='weekendCell' onClick={this.onDateCellClick}>
                    {this.renderDateContent()}
                </div>
            )
        }
        else if (this.props.type === "prev" || this.props.type === "next") {
            return (
                <div className='fadedCell' onClick={this.onDateCellClick}>
                    {null}
                </div>
            )
        }
    }
    renderDateContent = () => {
        return (
            <React.Fragment>
                <div className='header'>
                    <img src={AddEvent} alt="AddEvent" />
                    <span>{this.props.date.getDate()}</span>
                </div>
                <div className='body'>
                    <ul>
                        {this.props.classes.map(classEntity =>
                            this.renderShortInfo(classEntity)
                        )}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
    renderShortInfo = (classEntity) => {
        let startHour = new Date(classEntity.classesFullStartDate)
        let endHour = new Date(classEntity.classesFullEndDate)
        let classesTypeShort = classEntity.classesType.toString().toUpperCase().substr(0, 1)
        return (
            <li className="classes-short-info" key={classEntity.classesId}>
                <div id="classes-hours">
                    {startHour.getHours() + ":" + (startHour.getMinutes() < 10 ? '0' : '') + startHour.getMinutes()}
                    <br />
                    {endHour.getHours() + ":" + (endHour.getMinutes() < 10 ? '0' : '') + endHour.getMinutes()}
                </div>
                <div id="classes-name">
                    {classEntity.classesName}
                </div>
                <div id="classes-type">
                    {classesTypeShort}
                </div>
            </li>
        )
    }
    rednerModal = () => {
        var monthEnum = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
        return (
            <Modal
                isOpen={this.state.isModalOpen}
                onRequestClose={this.toggleModalOpen}
                contentLabel="Example Modal"
                className="modal"
            >
                <div className="modal-top-bar">
                    <span>{this.props.date.getDate()} {monthEnum[this.props.date.getMonth()]} {this.props.date.getFullYear()}</span>
                    <img src={Exit} onClick={this.toggleModalOpen} alt="exit-button" />
                </div>
                <hr />
                <ModalClassesContent classes={this.props.classes}/>
            </Modal>
        )
    }
    render() {
        return (
            <React.Fragment>
                {this.renderContent()}
                {this.props.date !== null ?
                    this.rednerModal()
                    :
                    null
                }
            </React.Fragment>
        );
    }
}

export default DateCell;