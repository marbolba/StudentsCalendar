import React, { Component } from 'react';
import DateCell from './DateCell'
import './Calendar.css'


class Calendar extends Component {
    state = {
        currentDate: null,
        thisMonthDates: []
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
        thisDate.setMonth(thisDate.getMonth()-1)
        this.setState({
            currentDate: thisDate
        })
        this.createThisMonthArray(thisDate)
    }
    setNextMonth = () => {
        var thisDate = new Date(this.state.currentDate)
        thisDate.setMonth(thisDate.getMonth()+1)
        this.setState({
            currentDate: thisDate
        })
        this.createThisMonthArray(thisDate)
    }
    setCurrentDate = (date) => {
        var thisDate = new Date(date)
        this.setState({
            currentDate: thisDate
        })
    }
    createThisMonthArray = (date) => {
        var dateIterate = new Date(date)
        dateIterate.setDate(1)
        var monthLength = this.daysInMonth(dateIterate.getMonth(), dateIterate.getFullYear())
        var firstDayOfMonth = dateIterate.getDay() - 1;//0 - 6

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
    getThisMonthCallendar = () => {
        let rows = []
        for (var i = 0; i < (parseInt(this.state.thisMonthDates.length / 7, 10) + 1); i++) {  //tygodnie
            let cell = []
            for (var j = 0; j < 7; j++) {
                if ((i * 7 + j) < this.state.thisMonthDates.length) {
                    if (this.state.thisMonthDates[(i * 7 + j)] !== null) {
                        var thisDate = new Date(this.state.currentDate)
                        thisDate.setDate(this.state.thisMonthDates[(i * 7 + j)])
                        if ((i * 7 + j + 1) % 7 !== 0) {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} type="date"/></td>)
                        }
                        else {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} type="date"/></td>)
                            rows.push(<tr key={i}>{cell}</tr>)
                        }
                    }
                    else {
                        cell.push(<td key={(i * 7 + j)}><DateCell type="prev" setPreviousMonth={this.setPreviousMonth}/></td>)
                    }
                }
                else {
                    while ((i * 7 + j) % 7 !== 0) {
                        cell.push(<td key={(i * 7 + j++)}><DateCell type="next" setNextMonth={this.setNextMonth}/></td>)
                    }
                    rows.push(<tr key={i}>{cell}</tr>)
                    break
                }
            }
        }
        return rows
    }
    getThisMonthTopBar = () => {
        var monthEnum = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
        var thisDate = new Date(this.state.currentDate)
        return(monthEnum[thisDate.getMonth()])
    }
    componentDidMount = () => {
        var data = new Date()
        this.setCurrentDate(data)
        this.createThisMonthArray(data)
    }
    render() {
        return (
            <div className='CalendarContent'>
                <div className='TopBar'>
                    {this.getThisMonthTopBar()}
                </div>
                <table>
                    <tbody >
                        {this.getThisMonthCallendar()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;