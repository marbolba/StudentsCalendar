import React, { Component } from 'react';
import ClassesListElement from './ClassesListElement';
import EventListElement from './EventListElement';
import ClassesFullInfo from './ClassesFullInfo';
import './ModalClassesContent.css';
import AddEvent from '../../../icon/add-event.png';

class ModalClassesContent extends Component {
    state = {
        classesSelected: null
    }
    setClassesSelected = (classesSelected) => {
        this.setState({
            classesSelected: classesSelected
        });
    }
    render() {
        return (
            <div className="modal-classes-content">
                {this.state.classesSelected == null ?
                    <React.Fragment>
                        <div className='modal-event-header'>
                            <div className='event-label'>Twoje zajęcia</div>
                            <img src={AddEvent} alt="AddEvent" title="Dodaj wydarzenie jednorazowe" onClick={this.props.addEventModalOpener.bind(this, true)} />
                        </div>
                        <div className='modal-classes-list'>
                            {this.props.events.classes.map((classEntity, index) => {
                                return (
                                    <ClassesListElement classEntity={classEntity} setClassesSelected={this.setClassesSelected} key={index} />
                                );
                            })}
                            {this.props.events.events.map((event, index) => {
                                return (
                                    <EventListElement event={event} key={index} />
                                );
                            })}
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <ClassesFullInfo classEntity={this.state.classesSelected}
                            setClassesSelected={this.setClassesSelected} />
                    </React.Fragment>
                }
            </div>
        );
    };
}
export default ModalClassesContent;