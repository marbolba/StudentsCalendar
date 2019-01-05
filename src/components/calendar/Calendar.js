import React, { Component } from 'react';
import DateCell from './DateCell';
import './Calendar.css';
import { connect } from "react-redux";
import Api from '../../api/Api';


class Calendar extends Component {
    state = {
        currentDate: null,
        thisMonthDates: [],
        thisMonthEvents: { "events": [], "classes": [] },
        isFetched: false
    }
    componentDidMount = () => {
        var date = new Date()
        this.setCurrentDate(date)
    }
    setCurrentDate = (date) => {
        this.clearThisMonthsEvents()
        var thisDate = new Date(date)
        this.createThisMonthArray(thisDate)
        this.getThisMonthEvents(thisDate.getFullYear(), thisDate.getMonth())
            .then(() => {
                this.setState({
                    currentDate: thisDate
                })
            })

    }
    daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    }
    addDays = (date, dayAmount) => {
        date.setDate(date.getDate() + dayAmount);
        return date;
    }
    setPreviousMonth = () => {
        this.clearThisMonthsEvents()
        var thisDate = new Date(this.state.currentDate)
        thisDate.setMonth(thisDate.getMonth() - 1)
        this.setCurrentDate(thisDate)
    }
    setNextMonth = () => {
        this.clearThisMonthsEvents()
        var thisDate = new Date(this.state.currentDate)
        thisDate.setMonth(thisDate.getMonth() + 1)
        this.setCurrentDate(thisDate)
    }
    createThisMonthArray = (date) => {
        var dateIterate = new Date(date)
        dateIterate.setDate(1)
        var monthLength = this.daysInMonth(dateIterate.getMonth(), dateIterate.getFullYear())
        var firstDayOfMonth = dateIterate.getDay() !== 0 ? dateIterate.getDay() - 1 : 6;//0 - 6

        var thisMonth = []
        for (var j = 0; j < monthLength + firstDayOfMonth; j++) {
            if (j >= firstDayOfMonth) {
                thisMonth.push(dateIterate.getDate())
                this.addDays(dateIterate, 1)
            } else {
                thisMonth.push(null)
            }
        }
        this.setState({
            thisMonthDates: thisMonth
        })
    }
    clearThisMonthsEvents = () => {
        this.setState({
            thisMonthEvents: { "events": [], "classes": [] }
        })
    }
    getThisMonthEvents = (year, month) => {
        let getThisMonthEvents = new Promise((resolve, reject) => {
            let monthLength = parseInt(this.daysInMonth(month, year), 10)
            let promisesTable = [Api.getUsersMonthsEvents(this.props.userId, parseInt(year, 10), parseInt(month + 1, 10), monthLength),
            Api.getUsersMonthsClasses(this.props.userId, parseInt(year, 10), parseInt(month + 1, 10), monthLength)]

            let newThisMonthsEventObj = {}
            Promise.all(promisesTable)
                .then(responses => {
                    responses.forEach((resp, index) => {
                        //zrobione po kolejnosci...
                        if (index === 0) {
                            newThisMonthsEventObj.events = resp.data;
                        } else {
                            newThisMonthsEventObj.classes = resp.data;
                        }
                    })
                    resolve()
                    this.setState({
                        thisMonthEvents: newThisMonthsEventObj
                    })
                })
        })
        return getThisMonthEvents

    }
    refreshThisMonthEventsOnly = (year, month) => {
        let monthLength = parseInt(this.daysInMonth(month, year), 10)
        Api.getUsersMonthsEvents(this.props.userId, parseInt(year, 10), parseInt(month + 1, 10), monthLength)
            .then(resp => {
                let newThisMonthsEventObj = this.state.thisMonthEvents
                newThisMonthsEventObj.events = resp.data
                this.setState({
                    thisMonthEvents: newThisMonthsEventObj
                })
            })
    }
    sortByHours = (a,b) => {
        let firstHour = parseInt(a.startTime.substring(0,2),10);
        let firstMinutes = parseInt(a.startTime.substring(3,5),10);
        let secondHour = parseInt(b.startTime.substring(0,2),10);
        let secondMinutes = parseInt(b.startTime.substring(3,5),10);
        if (firstHour < secondHour)
            return -1;
        if (firstHour > secondHour)
            return 1;
        if (firstMinutes < secondMinutes)
            return -1;
        if (firstMinutes > secondMinutes)
            return 1;
        return 0;
    }
    getThisDateEvents = (day) => {
        let thisDayEvents = { "events": [], "classes": [] }
        thisDayEvents.classes = this.state.thisMonthEvents.classes.filter(classEntity => {
            return new Date(classEntity.classesFullStartDate).getDate() === day
        });
        thisDayEvents.events = this.state.thisMonthEvents.events.filter(event => {
            return new Date(event.eventDate).getDate() === day;
        });
        thisDayEvents.events.sort(this.sortByHours)
        return thisDayEvents;
    }
    getThisMonthCallendar = () => {
        let rows = []
        let cell = []
        cell.push(<th key="Poniedzialek">Pon</th>)
        cell.push(<th key="Wtorek">Wt</th>)
        cell.push(<th key="Środa">Śr</th>)
        cell.push(<th key="Czwartek">Czw</th>)
        cell.push(<th key="Piątek">Pt</th>)
        cell.push(<th key="Sobota">Sob</th>)
        cell.push(<th key="Niedziela">Nd</th>)
        rows.push(<tr key={-1}>{cell}</tr>)

        for (var i = 0; i < (parseInt(this.state.thisMonthDates.length / 7, 10) + 1); i++) {  //tygodnie
            cell = []
            for (var j = 0; j < 7; j++) {
                if ((i * 7 + j) < this.state.thisMonthDates.length) {
                    if (this.state.thisMonthDates[(i * 7 + j)] !== null) {
                        var thisDate = new Date(this.state.currentDate)
                        thisDate.setDate(this.state.thisMonthDates[(i * 7 + j)])
                        if (thisDate.getDate() === (new Date()).getDate() && thisDate.getMonth() === (new Date()).getMonth() && thisDate.getFullYear() === (new Date()).getFullYear()) {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate}
                                events={this.getThisDateEvents(thisDate.getDate())}
                                type="current"
                                refreshEventsOnly={this.refreshThisMonthEventsOnly} /></td>)
                        }
                        else if (!(((i * 7 + j + 1) % 7 !== 0) ^ ((i * 7 + j + 1) % 7 !== 6))) {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate}
                                events={this.getThisDateEvents(thisDate.getDate())}
                                type="date" 
                                refreshEventsOnly={this.refreshThisMonthEventsOnly} /></td>)
                        }
                        else {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate}
                                events={this.getThisDateEvents(thisDate.getDate())}
                                type="weekend" 
                                refreshEventsOnly={this.refreshThisMonthEventsOnly} /></td>)
                        }
                        if ((i * 7 + j + 1) % 7 === 0) {
                            rows.push(<tr key={i}>{cell}</tr>)
                        }
                    }
                    else {
                        cell.push(<td key={(i * 7 + j)}><DateCell date={null} type="prev" setPreviousMonth={this.setPreviousMonth} /></td>)
                    }
                }
                else {
                    while ((i * 7 + j) % 7 !== 0) {
                        cell.push(<td key={(i * 7 + j++)}><DateCell date={null} type="next" setNextMonth={this.setNextMonth} /></td>)
                    }
                    rows.push(<tr key={i}>{cell}</tr>)
                    break
                }
            }
        }
        return rows
    }
    getThisMonthTopBar = () => {
        var monthEnum = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
        var thisDate = new Date(this.state.currentDate)
        return (
            <div className="topBar">
                <div className="topBar-buttons">
                    <button onClick={this.setPreviousMonth} title="Wyświetl poprzedni miesiąc">Wcześniej</button>
                    <button onClick={() => { this.setCurrentDate(new Date()) }} title="Wyświetl obecny miesiąc">Dzisiaj</button>
                    <button onClick={this.setNextMonth} title="Wyświetl następny miesiąc">Później</button>
                </div>
                <span>{monthEnum[thisDate.getMonth()]} {thisDate.getFullYear()}</span>
            </div>
        )
    }
    render() {
        return (
            <div className='CalendarContent'>
                {this.getThisMonthTopBar()}
                <div className='Calendar'>
                    <table>
                        <tbody >
                            {this.getThisMonthCallendar()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
const mapStateToProps = store => {
    return {
        userId: store.user.userId,
        userAuthorized: store.user.userAuthorized
    }
}
export default connect(
    mapStateToProps
)(Calendar)