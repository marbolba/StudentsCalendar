import axios from "axios";

const apiBase = 'http://localhost:4141/api/';
class Api {
    static getUsersGroups = (userId) => {
        return axios.get(apiBase + 'groups/user?userId=' + userId);
    }
    static shareFileToGroup = (fileId, groupId) => {
        return axios.post(apiBase + 'groups/' + groupId + '/share?fileId=' + fileId)
    }
    static getGroupsFilesList = (groupId) => {
        return axios.get(apiBase + 'groups?groupId=' + groupId);
    }
    static addFileToClass = (userId,classesId,selectedFile) => {
        let url = apiBase + 'files?fileOwnerId=' + userId + '&classesId=' + classesId
        const fd = new FormData();
        fd.append('file', selectedFile);
        return axios.post(url, fd)
    }
    static getClassesFiles = (userId,classesId) => {
        let url = apiBase + 'files?fileOwnerId=' + userId + '&classesId=' + classesId
        return axios.get(url)
    } 
    static deleteFile = (fileId) => {
        let url = apiBase + 'files?fileId=' + fileId
        return axios.delete(url)
    }
    static fetchCoursesFiles = (courseId) => {
        let url = apiBase + 'files?coursesId=' + courseId
        return axios.get(url)
    }
    static getUsersCourses = (userId) => {
        let url = apiBase + 'courses?userId=' + userId
        return axios.get(url)
    }
}
export default Api;