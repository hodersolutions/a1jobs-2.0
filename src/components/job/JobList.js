import React, {Component} from 'react';
import JobCard from './JobCard';

class JobList extends Component {    
    render() {        
        return (
            <div className='container'>
                {
                    this.props.list.map((jobObj, index) => {                        
                        return (                            
                            <JobCard job={ jobObj } key={ index }/>                            
                        );
                    })
                }
            </div>
        );          
    }
}

export default JobList;