import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { green, blue } from '@material-ui/core/colors';
import BusinessIcon from '@material-ui/icons/Business';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/Subject';
import MoneyIcon from '@material-ui/icons/Money';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

export class JobCard extends Component {
    render() {
        const url = '/showjob/' + this.props.job.id;
        return (              
            <Link to={ url } className='card-container'>
                <div className="a1-card container">
                    <div className='row'>
                        <div className='col-1'>
                            {/* Get school logo Dynamic */}
                            <BusinessIcon className="border rounded" color="disabled" style={{ fontSize: 130 }}/>
                        </div>
                        <div className='col-11 text-left'>
                            <div className='container-fluid card-data'>
                                <div className='row row-gap'>
                                    <div className='col-*'>
                                        <span className='title'>{this.props.job.title}</span>
                                    </div>
                                </div>
                                <div className='row row-gap'>
                                    <div className='col-*'>
                                        <BusinessCenterIcon className='img-align' style={{ color: green[500] }} /><span className='text'>{this.props.job.organization}</span>
                                    </div>
                                </div>
                                <div className='row description'>
                                    <div className='col-3 text-left'>
                                        <LocationOnIcon className='img-align' color="error" /><span className='text'>{this.props.job.location}</span>
                                    </div>
                                    <div className='col-3 text-left'>
                                        <SubjectIcon className='img-align' color="primary" /><span className='text'>{this.props.job.subject}</span>
                                    </div>
                                    <div className='col-3 text-left'>
                                        <MoneyIcon className='img-align' style={{ color: green[500] }} /><span className='text'>{this.props.job.salary}</span>
                                    </div>
                                    <div className='col-3 text-left'>
                                        <ScheduleIcon className='img-align' style={{ color: blue[500] }} /><span className='text'>{this.props.job.type}</span>
                                    </div>
                                </div>
                            </div>                            
                        </div>                         
                    </div>                    
                </div>
            </Link>
        )
    }
}

export default JobCard;