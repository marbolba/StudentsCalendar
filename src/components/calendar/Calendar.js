import React, { Component } from 'react';
import DateCell from './DateCell';
import './Calendar.css';
import { connect } from "react-redux";
import axios from "axios";


class Calendar extends Component {
    state = {
        currentDate: null,
        thisMonthDates: [],
        thisMonthEvents: [],
        isFetched: false
    }
    componentDidMount = () => {
        var date = new Date()
        this.setCurrentDate(date)
    }
    setCurrentDate = (date) => {
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
        var thisDate = new Date(this.state.currentDate)
        thisDate.setMonth(thisDate.getMonth() - 1)
        this.setCurrentDate(thisDate)
    }
    setNextMonth = () => {
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
    getThisMonthEvents = (year, month) => {
        let getThisMonthEvents = new Promise((resolve, reject) => {
            var monthLength = parseInt(this.daysInMonth(month, year), 10)
            let url = "http://localhost:4141/api/classes?userId=" + parseInt(this.props.userId, 10) + "&year=" + parseInt(year, 10) + "&month=" + parseInt(month + 1, 10) + "&lastDayOfMonth=" + monthLength
            axios.get(url)
                .then(response => {
                    resolve()
                    this.setState({
                        thisMonthEvents: response.data
                    })
                })
        })
        return getThisMonthEvents

    }
    getThisDateEvents = (day) => {
        let found = this.state.thisMonthEvents.filter(classEntity => {
            return new Date(classEntity.classesFullStartDate).getDate() === day
        });
        return found

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
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} classes={this.getThisDateEvents(thisDate.getDate())} type="current" /></td>)
                        }
                        else if (!(((i * 7 + j + 1) % 7 !== 0) ^ ((i * 7 + j + 1) % 7 !== 6))) {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} classes={this.getThisDateEvents(thisDate.getDate())} type="date" /></td>)
                        }
                        else {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} classes={this.getThisDateEvents(thisDate.getDate())} type="weekend" /></td>)
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