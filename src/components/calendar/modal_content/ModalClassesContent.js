import React, { Component } from 'react';
import ClassesListInfo from './ClassesListInfo';
import ClassesFullInfo from './ClassesFullInfo';
import './Modal.css';

class ModalClassesContent extends Component {
    state = {
        classesSelected: null,
        //classes: []
    }
    /*componentDidMount = () => {
        const classesPromises = this.props.classes.map(classEntity => {
            let url = 'http://localhost:4141/api/files?fileOwnerId=' + this.props.userId + '&classesId=' + classEntity.classes_id;
            return { promise: axios.get(url), id: classEntity.classes_id }//.catch(Error)
        });
        let newClassesArray = this.props.classes;

        var bar = new Promise((resolve, reject) => {
        Promise.all(classesPromises)
            .then((results) => {
                results.forEach(response => {
                    response.promise.then(val => {

                        newClassesArray.forEach(classObj => {
                            if(classObj.classes_id === response.id){
                                classObj.files=val.data;
                            }
                        })
                    })
                })
                resolve()
            })
        });
        bar.then(()=>{
            this.setState({
                classes:newClassesArray
            })
        })
    }*/
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
                        <button>Dodaj wydarzenie</button>
                        {this.props.classes.map(classEntity =>
                            <ClassesListInfo classEntity={classEntity} setClassesSelected={this.setClassesSelected} />
                        )}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <ClassesFullInfo classEntity={this.state.classesSelected} setClassesSelected={this.setClassesSelected} />
                    </React.Fragment>
                }
            </div>
        );
    };
}
export default ModalClassesContent;