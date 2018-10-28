import React, { Component } from 'react';
import ClassesListInfo from './ClassesListInfo';
import ClassesFullInfo from './ClassesFullInfo';
import './Modal.css';

class ModalClassesContent extends Component {
    state = {
        classesSelected: null,
        refresh: false
    }
    setClassesSelected = (classesSelected) => {
        this.setState({
            classesSelected: classesSelected
        });
    }
    render() {
        let key=0;
        return (
            <div className="modal-classes-content">
                {this.state.classesSelected == null ?
                    <React.Fragment>
                        <button>Dodaj wydarzenie</button>
                        {this.props.classes.map(classEntity =>
                            <ClassesListInfo classEntity={classEntity} 
                                            setClassesSelected={this.setClassesSelected} key={key++}/>
                        )}
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