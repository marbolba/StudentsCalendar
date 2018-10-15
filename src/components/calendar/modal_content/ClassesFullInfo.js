import React, { Component } from 'react';
import './ClassesFullInfo.css';


class ClassesFullInfo extends Component {
    state = {
        addDropdown: false
    }
    componentWillMount() {
        document.addEventListener('mousedown', this.handleOutDropdownClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutDropdownClick, false);
    }
    handleOutDropdownClick = (event) => {
        if (!this.dropdown.contains(event.target) && !this.dropdown_arrow.contains(event.target)) {
            this.setState({
                addDropdown: false
            })
        }
    }
    toggleAddDropdown = () => {
        this.setState({
            addDropdown: !this.state.addDropdown
        })
    }
    render() {
        let startHour = new Date(this.props.classEntity.classesFullStartDate)
        let endHour = new Date(this.props.classEntity.classesFullEndDate)
        return (
            <React.Fragment>
                <div className="classes-list-info">
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
                </div>
                <div className='materials'>
                    <div className='materials-header'>
                        <span>Materiały z zajęć</span>
                        <button id='addMaterials' ref={dropdown_arrow => this.dropdown_arrow = dropdown_arrow} onClick={this.toggleAddDropdown}>Dodaj materiały</button>
                        <div className='add-dropdown' ref={dropdown => this.dropdown = dropdown} style={this.state.addDropdown ? { visibility: "visible" } : { visibility: "hidden" }}>
                            <span>Dodaj:</span>
                            <ul>
                                <li>Dokumenty</li>
                                <li>Zdjęcia</li>
                                <li>Notatki</li>
                            </ul>
                        </div>
                    </div>
                    <div id='documents'>
                        documents
                    </div>
                    <div id='notes'>
                        notes
                    </div>
                    <div id='photos'>
                        photos
                    </div>
                </div>
                <div className='add-container'>
    

                </div>
            </React.Fragment>
        );
    };
}
export default ClassesFullInfo;