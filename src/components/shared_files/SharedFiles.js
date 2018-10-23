import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './SharedFiles.css'


class SharedFiles extends Component {
    state = {
        filesView: false
    }
    componentDidMount = () => {
    }
    toggleGroupFiles = () => {
        if (this.state.filesView !== false) {
            this.setState({
                filesView: !this.state.filesView
            })
        }
    }
    toggleMyFiles = () => {
        if (this.state.filesView !== true) {
            this.setState({
                filesView: !this.state.filesView
            })
        }
    }
    render() {
        return (
            <div className='base-view'>
                <div className='content-view'>
                    <div className='viewSelection'>
                        <div className='viewOption' onClick={this.toggleGroupFiles}>
                            <span>Udostępnione materiały z twoich grup</span>
                        </div>
                        <div className='viewOption' onClick={this.toggleMyFiles}>
                            <span>Udostępnione przez Ciebie materiały</span>
                        </div>
                    </div>
                    <div className='filesView'> {this.state.filesView ?
                        <div className='myFilesView'>
                            my
                    </div>
                        :
                        <div className='groupView'>
                            group
                    </div>
                    } </div>
                </div>
            </div>
        );
    }
};
const mapStateToProps = store => {
    return {
        userId: store.user.userId,
        userAuthorized: store.user.userAuthorized
    }
}
export default connect(
    mapStateToProps
)(SharedFiles)