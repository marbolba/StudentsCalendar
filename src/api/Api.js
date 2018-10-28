import axios from "axios";

const apiBase = 'http://localhost:4141/api/';
class Api {
    static getUsersGroups = (userId) => {
        return axios.get(apiBase + 'groups/user?userId=' + userId);
    }
    static shareFileToGroup = (fileId, groupId) => {
        console.log(fileId, groupId)
        return axios.post(apiBase + 'groups/' + groupId + '/share?fileId=' + fileId)
    }
    static getGroupsFilesList = (groupId) => {
        return axios.get(apiBase + 'groups?groupId=' + groupId);
    }
}
export default Api;