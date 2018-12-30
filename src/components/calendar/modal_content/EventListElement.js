import React, { Component } from 'react';
import { connect } from "react-redux";
import './EventListElement.css';

class EventListElement extends Component {
    render() {
        return (
            <div className="event-list-info">
                <div id="event-hours">
                    {this.props.event.startTime}
                    <br />
                    {this.props.event.endTime}
                </div>
                <div className='event-info-container'>
                    <div id="event-name">
                        {this.props.event.name}
                    </div>
                    <div id="event-descr">
                        {this.props.event.description}
                    </div>
                </div>
                <div id="event-type">
                    Wydarzenie
                </div>
            </div>
        );
    };
}
const mapStateToProps = store => {
    return {
        userId: store.user.userId
    }
}
export default connect(
    mapStateToProps
)(EventListElement)