import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Api from '../../api/Api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CustomEventForm.css';

class CustomEventForm extends Component {
    state = {
        customEventName: "",
        customEventDescr: "",
        customEventStartTime: "",
        customEventEndTime: ""
    }
    onSubmitHandler = () => {
        if (this.state.customEventName !== "" &&
            this.state.customEventStartTime !== "" && this.state.customEventEndTime !== "") {

            let data = {
                "name": this.state.customEventName,
                "description": this.state.customEventDescr,
                "startTime": this.state.customEventStartTime,
                "endTime": this.state.customEventEndTime,
                "eventDate" : this.props.date.getFullYear() + "-" + ((this.props.date.getMonth()+1) < 10 ? "0"+(this.props.date.getMonth()+1) : (this.props.date.getMonth()+1)) + "-" + (this.props.date.getDate() < 10 ? "0"+this.props.date.getDate() : this.props.date.getDate())
            }

            Api.addCustomEvent(this.props.userId,data)
                .then(() => {
                    this.cleanInputForm();
                    this.props.refreshCustomEvents();
                    toast.success("Dodano wydarzenie");
                })
        }
        else {
            toast.error("Proszę wypełnić wymagane dane");
        }

    }
    cleanInputForm = () => {
        document.getElementById("appt-timeS").value = "";
        document.getElementById("appt-timeE").value = "";
        this.setState({
            customEventName: "",
            customEventDescr: "",
            customEventStartTime: "",
            customEventEndTime: ""
        })
    }
    render() {

        return (
            <div className='addCustomEvent'>
                <div className='modal-event-header'>
                    <div className='event-label'>Nowe wydarzenie jednorazowe</div>
                </div>
                <div className='modal-classes-list'>
                    <div className='formItem'>
                        <span>Nazwa wydarzenia</span>
                        <input type="text" onChange={(e) => { this.setState({ customEventName: e.target.value }) }} value={this.state.customEventName} />
                    </div>
                    <div className='formItem'>
                        <span>Opis wydarzenia (opcjonalne)</span>
                        <input type="text" onChange={(e) => { this.setState({ customEventDescr: e.target.value }) }} value={this.state.customEventDescr} />
                    </div>
                    <div className='formItem'>
                        <span>Godzina rozpoczęcia</span>
                        <input className='timeInput' type="time" id="appt-timeS" name="appt-time" onChange={(e) => {
                            this.setState({ customEventStartTime: e.target.value })
                        }} />
                    </div>
                    <div className='formItem'>
                        <span>Godzina zakończenia</span>
                        <input className='timeInput' type="time" id="appt-timeE" name="appt-time" onChange={(e) => {
                            this.setState({ customEventEndTime: e.target.value })
                        }} />
                    </div>
                    <div className='formItem'>
                        <div className='submitButton' onClick={this.onSubmitHandler}>
                            <span>Prześlij</span>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
CustomEventForm.propTypes = {
    date: PropTypes.object.isRequired
};
const mapStateToProps = store => {
    return {
        userId: store.user.userId,
        userAuthorized: store.user.userAuthorized
    }
}
export default connect(
    mapStateToProps
)(CustomEventForm)