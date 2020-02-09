import axios from 'axios';
import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {
	constructor() {	
        super();	
        this.getStates = (config={}) =>  axios.get(`${this.url}api/v1/states/all`, config)
        .then((response) => {
            return response.data;				
        })
        .catch(error => {
            if (error.response !== undefined)
                return error.response.data
            else                
                return error
        });
        this.getSubjects = (config={}) =>  axios.get(`${this.url}api/v1/subjects/all`, config)
        .then((response) => {
            return response.data;				
        })
        .catch(error => {
            if (error.response !== undefined)
                return error.response.data
            else                
                return error
        });
        this.getQualifications = (config={}) =>  axios.get(`${this.url}api/v1/qualifications/all`, config)
        .then((response) => {
            return response.data;				
        })
        .catch(error => {
            if (error.response !== undefined)
                return error.response.data
            else                
                return error
        });
    }
}

export default UserAPI
