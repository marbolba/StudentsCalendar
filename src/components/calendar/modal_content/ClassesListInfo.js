import React, { Component } from 'react';
import './Modal.css';

import Documents from '../../../icon/document.png';
import Notes from '../../../icon/notes.png';
import Photos from '../../../icon/photo.png';

class ClassesListInfo extends Component {

    render(){
        let startHour = new Date(this.props.classEntity.classesFullStartDate)
        let endHour = new Date(this.props.classEntity.classesFullEndDate)
        return (
            <div className="classes-list-info" onClick={this.props.setClassesSelected.bind(this,this.props.classEntity)} key={this.props.classEntity.classes_id}>
                <div id="classes-hours">
                    {startHour.getHours() + ":" + (startHour.getMinutes() < 10 ? '0' : '') + startHour.getMinutes()}
                    <br />
                    {endHour.getHours() + ":" + (endHour.getMinutes() < 10 ? '0' : '') + endHour.getMinutes()}
                </div>
                <div id="classes-type">
                    {this.props.classEntity.classesType}
                </div>

                <div id="classes-name">
                    {this.props.classEntity.classesName}
                </div>
                <img id="documents" src={Documents} alt="documents attached" />
                <img id="photos" src={Photos} alt="photos attached" />
                <img id="notes" src={Notes} alt="notes attached" />
            </div>
        );
    };
}
export default ClassesListInfo;