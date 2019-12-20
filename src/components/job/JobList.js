import React, {Component} from 'react';
import jobs from '../../mock/JobData';
import JobCard from './JobCard';

class JobList extends Component {    
    render() {
        return (
            <div className='job-list'>
                {jobs.map((jobObj, index) => {                    
                    return (
                        <div key={ index + 1 }>
                            <JobCard job={ jobObj } />
                            <hr/>
                        </div>
                    );
                })}
            </div>
        );        
    }
}

export default JobList;