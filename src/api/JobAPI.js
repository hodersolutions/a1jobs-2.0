import axios from 'axios';
import BaseAPI from './BaseAPI';

class JobAPI extends BaseAPI {
    getJob = async (job, config={}) => {  
        const userInput = (job.userid !== null ? '&userid=' + job.userid : '');          
        return await axios.get(`${this.url}api/v1/requisition?id=${job.id}${userInput}`, config)
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

    postJob = async (job, config={}) =>  {
        return await axios.post(`${this.url}api/v1/requisitions`, job, config, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'access_token': localStorage.getItem('access_token'),
                    'mobile': localStorage.getItem('mobile')
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

    applyJob = async (apply, config={}) =>  {
        return await axios.post(`${this.url}api/v1/jobapplications`, apply, config, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'access_token': localStorage.getItem('access_token'),
                    'mobile': localStorage.getItem('mobile')
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

    getAppliedJobs = async (userid, config={}) =>  {
        return await axios.get(`${this.url}api/v1/jobapplications?userid=` + userid, config, {
                headers: {
                   'Content-Type': 'application/json'
                }            
            }
        ).then((response) => {
            return response.data;
        })
        .catch(error => {
            if (error.response !== undefined)
                return error.response.data
            else                
                return error
        });
    }

    getJobs = async (searchfilter, params, config={}) => {        
        let full_uri = ``, filter_string = ``;        
        if (searchfilter.searchToken !== `` && searchfilter.searchToken !== undefined)
            filter_string = `${filter_string}searchToken=${searchfilter.searchToken}`;
        if (searchfilter.subject > 0)
            filter_string = `${filter_string}&subject=${searchfilter.subject}`;
        if (searchfilter.jobtype > 0)
            filter_string = `${filter_string}&jobtype=${searchfilter.jobtype}`;
        if (searchfilter.stateLocation > 0)
            filter_string = `${filter_string}&state=${searchfilter.stateLocation}`;
        if (searchfilter.district > 0)
            filter_string = `${filter_string}&district=${searchfilter.district}`;
        if (searchfilter.town > 0)
            filter_string = `${filter_string}&town=${searchfilter.town}`;
        if (params.userid === undefined){
            if (filter_string !== "")
                full_uri = `${this.url}api/v1/requisitions/filter?`+filter_string;            
            else
                full_uri = `${this.url}api/v1/requisitions/filter`;            
        }
        else
            full_uri = `${this.url}api/v1/requisitions/filter?submitter=` + params.userid;
        
        return await axios.get(full_uri, config, {
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

export default JobAPI