import axios from "axios";

const apiBase = 'http://localhost:4141/api/';
class Api {
    static getUsersGroups = (userId) => {
        return axios.get(apiBase + 'groups/user?userId=' + userId);
    }
    static shareFileToGroup = (fileId, groupId) => {
        return axios.post(apiBase + 'groups/' + groupId + '/share?fileId=' + fileId);
    }
    static getGroupsFilesList = (groupId) => {
        return axios.get(apiBase + 'groups?groupId=' + groupId);
    }
    static addFileToClass = (userId,classesId,selectedFile) => {
        let url = apiBase + 'files?fileOwnerId=' + userId + '&classesId=' + classesId;
        const fd = new FormData();
        fd.append('file', selectedFile);
        return axios.post(url, fd);
    }
    static getClassesFiles = (userId,classesId) => {
        let url = apiBase + 'files?fileOwnerId=' + userId + '&classesId=' + classesId;
        return axios.get(url);
    } 
    static deleteFile = (fileId) => {
        let url = apiBase + 'files?fileId=' + fileId;
        return axios.delete(url);
    }
    static fetchCoursesFiles = (courseId) => {
        let url = apiBase + 'files?coursesId=' + courseId;
        return axios.get(url);
    }
    static getUsersCourses = (userId) => {
        let url = apiBase + 'courses?userId=' + userId;
        return axios.get(url);
    }
    static getFile = (fileId) => {
        let url = apiBase + 'files?fileId=' + fileId;
        return axios.get(url);
    }
    static addCourse = (courseData) => {
        let url = apiBase + "courses";
        return axios.post(url, courseData);
    }
    static addCustomEvent = (userId, eventData) => {
        let url = apiBase + 'events?eventOwnerId='+userId;
        return axios.post(url, eventData);
    }
    static getUsersMonthsEvents = (userId, year, month, monthLength) => {
        let url = apiBase + 'events?userId=' + userId + "&year=" + year+ "&month=" + month + "&lastDayOfMonth=" + monthLength;
        return axios.get(url,apiBase);
    }
    static getUsersMonthsClasses = (userId, year, month, monthLength) => {
        let url = apiBase + "classes?userId=" + userId + "&year=" + year + "&month=" + month + "&lastDayOfMonth=" + monthLength;
        return axios.get(url);
    }
    static findGroupsStartingWith = (text) => {
        let url = apiBase + "groups?startsWith="+text;
        return axios.get(url);
    }
    static addUserToGroup = (groupId,userId) => {
        let url = apiBase + 'groups/user?groupId=' + groupId + "&userId=" + userId
        return axios.post(url)
    }
    static downloadFile = (fileId) => {
        let url = apiBase + 'files/download?fileId=' + fileId;
        return axios.get(url)
    }
}
export default Api;