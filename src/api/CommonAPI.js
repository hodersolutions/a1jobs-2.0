import axios from 'axios';
import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {
	constructor() {	
        super();	
        this.getStates = (config={}) =>  axios.get(`${this.url}api/v1/states/all`, config);
        this.getSubjects = (config={}) =>  axios.get(`${this.url}api/v1/subjects/all`, config);
        this.getQualifications = (config={}) =>  axios.get(`${this.url}api/v1/qualifications/all`, config);
    }
}

export default UserAPI