import React, { Component } from 'react';
import ClassesListInfo from './ClassesListInfo';
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
    addCustomEvent = () => {
        console.log("adding custom event")
    }
    render() {
        return (
            <div className="modal-classes-content">
                {this.state.classesSelected == null ?
                    <React.Fragment>
                        <div className='modal-event-header'>
                            <div className='event-label'>Twoje zajęcia</div>
                            <img src={AddEvent} alt="AddEvent" title="Dodaj wydarzenie jednorazowe" onClick={this.addCustomEvent} />
                        </div>
                        <div className='modal-classes-list'>
                            {this.props.classes.map((classEntity,index) =>
                                <ClassesListInfo classEntity={classEntity}
                                    setClassesSelected={this.setClassesSelected} key={index} />
                            )}
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