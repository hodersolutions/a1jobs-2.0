import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';

export class JobCard extends Component {
    constructor(props) {
		super(props);		
	}
    render() {
        const url = '/showjob/' + this.props.job.id;
        return (              
            <Link to={ url } className='card-container'>
                <div className="bdy card"></div>
            </Link>
        )
    }
}

export default JobCard;