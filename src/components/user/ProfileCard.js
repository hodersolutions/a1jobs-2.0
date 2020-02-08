import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/Subject';
import WorkIcon from '@material-ui/icons/Work';
import CallIcon from '@material-ui/icons/Call';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { grey } from '@material-ui/core/colors';

export class ProfileCard extends Component {    
    render() {
        const url = '/profile/' + this.props.profile.id; 
        return (
            <Link to={ url } className='card-container'>
                <div className='a1-card row align-items-start job-item border-bottom pb-3 mb-3 pt-3'>
                    <div className='col-md-2'>                        
                        <AccountBoxIcon style={{ color: grey[500], fontSize: 120 }}/> 
                    </div>
                    <div className='col-md-4'>                        
                        <h2>{this.props.profile.fullname}</h2>
                        <p className='meta'><CallIcon className='img-align' color='disabled' /> <strong>{this.props.profile.mobile}</strong></p>
                        <p className='meta'><SubjectIcon className='img-align' color='disabled' /> <strong>{this.props.profile.teachingsubject}</strong></p>
                    </div>
                    <div className='col-md-3 text-left'>
                        <p className='meta'><LocationOnIcon className='img-align' color='disabled' /> <strong>{this.props.profile.stateLocation},</strong></p>
                        <p className='meta'>&emsp;&ensp;&nbsp;<strong>{this.props.profile.district},</strong></p>
                        <p className='meta'>&emsp;&ensp;&nbsp;<strong>{this.props.profile.town}</strong></p>                        
                    </div>
                    <div className='col-md-3 text-md-right'>
                        <WorkIcon className='img-align' color='disabled' /> <strong className='text-black'>{this.props.profile.totalexperience}&nbsp;months exp</strong>
                    </div>
                </div>
            </Link>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        user: state.user
    }
}
        
export default connect(mapStateToProps,null)(ProfileCard);