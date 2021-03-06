import React, { Component } from 'react';
import './DateCell.css';
import Exit from '../../icon/exit.png';
import Modal from 'react-modal';
import ModalClassesContent from './modal_content/ModalClassesContent';
import AddEvent from '../../icon/add-event.png';
import CustomEventForm from '../custom_event/CustomEventForm';

/**
 * Props list:
 * date - Obj
 * type - {date,prev,next,current,weekend}
 */
class DateCell extends Component {
    state = {
        isModalOpen: false,
        isAddCustomEventModalOpen: false
    }
    componentWillMount() {
        Modal.setAppElement('body');
    }
    toggleModalOpen = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    toggleAddCustomEventModalOpen = (bool) => {
        this.setState({
            isAddCustomEventModalOpen: bool
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
        let itemsNumber = this.props.events.classes.length + this.props.events.events.length;
        return (
            <React.Fragment>
                <div className='header'>
                    <img src={AddEvent} alt="AddEvent" title="Dodaj wydarzenie jednorazowe" onClick={(e) => {
                        this.toggleAddCustomEventModalOpen( true)
                        e.stopPropagation();
                    }} />
                    <span>{this.props.date.getDate()}</span>
                </div>
                <div className={itemsNumber > 3 ? 'bodyExtended': 'body'} >
                    <ul>
                        {this.props.events.classes.map((classEntity,index) =>
                            this.renderShortClassesInfo(classEntity,index)
                        )}
                        {this.props.events.events.map((customEvent,index) =>
                            this.renderShortCustomEventInfo(customEvent,index)
                        )}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
    renderShortClassesInfo = (classEntity,index) => {
        let startHour = new Date(classEntity.classesFullStartDate)
        let endHour = new Date(classEntity.classesFullEndDate)
        let classesTypeShort = classEntity.classesType.toString().toUpperCase().substr(0, 1)
        return (
            <li className="classes-short-info" key={index}>
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
    renderShortCustomEventInfo = (customEvent,index) => {
        return (
            <li className="event-short-info" key={index+100}>
                <div id="event-hours">
                    {customEvent.startTime}
                    <br />
                    {customEvent.endTime}
                </div>
                <div id="event-name">
                    {customEvent.name}
                </div>
            </li>
        )
    }
    rednerModal = () => {
        var monthEnum = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
        return (
            <Modal
                isOpen={this.state.isModalOpen}
                onRequestClose={this.toggleModalOpen}
                contentLabel="Example Modal"
                className="modal"
            >
                <div className="modal-top-bar">
                    <div className="modal-top-bar-info">
                        <span>{this.props.date.getDate()} {monthEnum[this.props.date.getMonth()]} {this.props.date.getFullYear()}</span>
                        <img src={Exit} onClick={this.toggleModalOpen} alt="exit-button" />
                    </div>
                    <hr />
                </div>
                {<ModalClassesContent events={this.props.events} addEventModalOpener={this.toggleAddCustomEventModalOpen}/> }
            </Modal>
        )
    }
    refreshCustomEvents = () => {
        this.props.refreshEventsOnly(this.props.date.getFullYear(),this.props.date.getMonth())
    }
    rednerAddCustomEvent = () => {
        return (
            <Modal
                isOpen={this.state.isAddCustomEventModalOpen}
                onRequestClose={this.toggleAddCustomEventModalOpen.bind(this,false)}
                contentLabel="Example Modal"
                className="modal"
            >
                <div className="modal-top-bar">
                    <div className="modal-top-bar-info">
                        <span>Dodaj wydarzenie jednorazowe</span>
                        <img src={Exit} onClick={this.toggleAddCustomEventModalOpen.bind(this,false)} alt="exit-button" />
                    </div>
                    <hr />
                </div>
                <CustomEventForm date={this.props.date} refreshCustomEvents={this.refreshCustomEvents}/>
            </Modal>
        )
    }
    render() {
        return (
            <React.Fragment>
                {this.renderContent()}
                {this.state.isAddCustomEventModalOpen ?
                    this.rednerAddCustomEvent()
                    : null
                }
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