import React, {Component} from 'react';
import jobs from '../../mock/JobData';
import JobCard from './JobCard';

class JobList extends Component {
    constructor(props) {
		super(props);		
	}
    render() {
        return (
            <div className='job-list'>
                {jobs.map((jobObj, index) => {
                    return (
                        <div>
                            <JobCard key={ index } job={ jobObj } />
                            <hr/>
                        </div>
                    );
                })}
            </div>
        );        
    }
}

export default JobList;