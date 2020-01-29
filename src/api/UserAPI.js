import axios from 'axios';
import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {
    getUserProfile = async ({ userid }, config={}) => {            
        return await axios.get(`${this.url}api/v1/profile?userid=${userid}`, config)
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

    getUserProfileById = async ({ id }, config={}) => {      
        return await axios.get(`${this.url}api/v1/profile/id?id=${id}`, config)
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

    getUserProfileByFilter = async ({ params }, config={}) => {   
        if (params === undefined) {
            var full_uri = `${this.url}api/v1/profile/filter`;
        } else {
            full_uri = `${this.url}api/v1/profile/filter${(params.userid !== null ? '?submitter=' + params.userid : '')}`
        }    

        return await axios.get(full_uri, config)
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

    updateUserProfile = async (userProfile, config={}) =>  {
        return await axios.post(`${this.url}api/v1/profile`, userProfile, config)
        .then( response => {
            if(response.status === 201)
                return response.data                    
        }
        ).catch((error) => {
            if (error.response !== undefined)
                return error.response.data
            else                
                return error                                   
        });
    }

    createUser = async (user, config={}) =>  {
        return await axios.post(`${this.url}api/v1/register`, user, config, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'role_keyword': (user.is_recruiter === true ? 'recruiter' : 'seeker')                    
                }
            }
        ).then( response => {
            if(response.status === 201)
                return response.data                    
        }
        ).catch((error) => {
            if (error.response !== undefined)
                return error.response.data
            else                
                return error                                   
        });
    }

    getAppliedUsers = async (job, config={}) => {
        return await axios.get(`${this.url}api/v1/jobapplications?requisitionid=${(job.requisitionid !== null ? job.requisitionid : '')}`, config, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
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