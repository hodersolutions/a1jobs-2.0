import React, {Component} from 'react';
import jobs from '../../mock/JobData';
import JobCard from './JobCard';
import './JobList.css';

export class JobList extends Component {
    constructor(props) {
		super(props);		
	}
    render() {
        return (
            <div className='bdy'>
                {jobs.map((jobObj, index) => {
                    return (<JobCard key={ index } job={ jobObj } />);
                })}
            </div>
        );        
    }
}

export default JobList;