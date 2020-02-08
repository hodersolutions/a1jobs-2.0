import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/Subject';
import MoneyIcon from '@material-ui/icons/Money';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

export class JobCard extends Component {    
    render() {
        const url = '/job/' + this.props.job.id;
        return (
            <Link to={ url } className='card-container'>
                <div className='a1-card row align-items-start job-item border-bottom pb-3 mb-3 pt-3'>
                    <div className='col-md-1'>
                        <img src={require('../../static/images/school.png')} alt='SchoolLogo' width='45' height='45'/>
                    </div>
                    <div className='col-md-5'>
                        <h2>&nbsp;{this.props.job.title}</h2>
                        <p className='meta'><BusinessCenterIcon className='img-align' color='disabled' /> <strong>{this.props.job.institution}&nbsp;</strong><SubjectIcon className='img-align' color='disabled' /> <strong>{this.props.job.subject}</strong></p>                        
                    </div>
                    <div className='col-md-4 text-left'>
                        <p className='meta'><LocationOnIcon className='img-align' color='disabled' /> <strong>{this.props.job.district}, </strong><strong>{this.props.job.state}</strong></p>                        
                    </div>
                    <div className='col-md-2 text-md-right'>
                        <MoneyIcon className='img-align' color='disabled' /> <strong className='text-black'>&#x20b9; {this.props.job.salary}</strong>
                    </div>
                </div>
            </Link>
        )
    }
}

export default JobCard;