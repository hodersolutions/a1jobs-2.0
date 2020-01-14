import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/Subject';
import MoneyIcon from '@material-ui/icons/Money';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

export class JobCard extends Component {    
    render() {
        const url = '/job/' + this.props.job.id;
        let show_badge = '';
        if(this.props.job.type === 'Freelance')
            show_badge = <span className='badge badge-primary px-2 py-1 mb-3'>{this.props.job.type}</span>
        else if(this.props.job.type === 'Fulltime')
            show_badge = <span className='badge badge-success px-2 py-1 mb-3'>{this.props.job.type}</span>
        else
            show_badge = <span className='badge badge-warning px-2 py-1 mb-3'>{this.props.job.type}</span>
    
        return (
            <Link to={ url } className='card-container'>
                <div className='a1-card row align-items-start job-item border-bottom pb-3 mb-3 pt-3'>
                    <div className='col-md-2'>
                        <img src={require('../../static/images/school.png')} alt='SchoolLogo' width='70' height='70' className='school-logo'/>
                    </div>
                    <div className='col-md-4'>
                        {show_badge}                        
                        <h2>{this.props.job.title}</h2>
                        <p className='meta'><BusinessCenterIcon className='img-align' color='disabled' /> <strong>{this.props.job.institution}</strong></p>
                        <p className='meta'><SubjectIcon className='img-align' color='disabled' /> <strong>{this.props.job.subject}</strong></p>
                    </div>
                    <div className='col-md-3 text-left'>
                        <p className='meta'><LocationOnIcon className='img-align' color='disabled' /> <strong>{this.props.job.location}</strong></p>
                        {/* <span className='meta'>India</span> */}
                    </div>
                    <div className='col-md-3 text-md-right'>
                        <MoneyIcon className='img-align' color='disabled' /> <strong className='text-black'>&#x20b9; {this.props.job.salary}</strong>
                    </div>
                </div>
            </Link>
        )
    }
}

export default JobCard;