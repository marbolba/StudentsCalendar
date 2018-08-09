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
        thisDate.setMonth(thisDate.getMonth() - 1)
        this.setCurrentDate(thisDate)
    }
    setNextMonth = () => {
        var thisDate = new Date(this.state.currentDate)
        thisDate.setMonth(thisDate.getMonth() + 1)
        this.setCurrentDate(thisDate)
    }
    setCurrentDate = (date) => {
        var thisDate = new Date(date)
        this.setState({
            currentDate: thisDate
        })
        this.createThisMonthArray(thisDate)
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
        let cell = []
        cell.push(<th key="Poniedzialek">Poniedzialek</th>)
        cell.push(<th key="Wtorek">Wtorek</th>)
        cell.push(<th key="Środa">Środa</th>)
        cell.push(<th key="Czwartek">Czwartek</th>)
        cell.push(<th key="Piątek">Piątek</th>)
        cell.push(<th key="Sobota">Sobota</th>)
        cell.push(<th key="Niedziela">Niedziela</th>)
        rows.push(<tr key={-1}>{cell}</tr>)


        for (var i = 0; i < (parseInt(this.state.thisMonthDates.length / 7, 10) + 1); i++) {  //tygodnie
            cell = []
            for (var j = 0; j < 7; j++) {
                if ((i * 7 + j) < this.state.thisMonthDates.length) {
                    if (this.state.thisMonthDates[(i * 7 + j)] !== null) {
                        var thisDate = new Date(this.state.currentDate)
                        thisDate.setDate(this.state.thisMonthDates[(i * 7 + j)])
                        if(thisDate.getDate()===(new Date()).getDate()&&thisDate.getMonth()===(new Date()).getMonth()&&thisDate.getFullYear()===(new Date()).getFullYear()){
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} type="current" /></td>)
                        }
                        else if ((i * 7 + j + 1) % 7 !== 0) {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} type="date" /></td>)
                        }
                        else {
                            cell.push(<td key={(i * 7 + j)}><DateCell date={thisDate} type="date" /></td>)
                            rows.push(<tr key={i}>{cell}</tr>)
                        }
                    }
                    else {
                        cell.push(<td key={(i * 7 + j)}><DateCell type="prev" setPreviousMonth={this.setPreviousMonth} /></td>)
                    }
                }
                else {
                    while ((i * 7 + j) % 7 !== 0) {
                        cell.push(<td key={(i * 7 + j++)}><DateCell type="next" setNextMonth={this.setNextMonth} /></td>)
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
        var buttonStyle = {
            margin: '10px',
            float: 'left'
          };
        return (
            <div>
                <button style={buttonStyle} onClick={this.setPreviousMonth}>Wcześniej</button>
                <button style={buttonStyle} onClick={() => {this.setCurrentDate(new Date())}}>Dzisiaj</button>
                <button style={buttonStyle} onClick={this.setNextMonth}>Później</button>
                {monthEnum[thisDate.getMonth()]} {thisDate.getFullYear()}
            </div>
        )
    }
    componentDidMount = () => {
        var data = new Date()
        this.setCurrentDate(data)
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