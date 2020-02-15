import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import { getStates, getSubjects, getQualifications } from '../../store/actions/commonActions';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { grey, green } from '@material-ui/core/colors';
import DetailsLoader from '../common/loading/DetailsLoader';
import UserAPI from '../../api/UserAPI';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { gender, teachingmedium, segment, department, circulum, resetProfile } from '../common/Constants';
import NoData from '../common/NoData';
import moment from 'moment';
import { DefaultDisplay } from '../common/Helper';
import { NotificationsTimeOut } from '../common/Constants';

class ViewAnyProfile extends Component {
	constructor(props) {
		super(props);
		this.api = null;
		this.state = {
			profile: resetProfile,
			loading: false
        }        
	}    
    
	async componentDidMount() {
		window.scrollTo(0, 0);		
		if (this.props.user !== null) {
			if (this.props.locations.length === 0)
				this.props.getStates();		
			if (this.props.subjects.length === 0)
				this.props.getSubjects();
			if (this.props.qualifications.length === 0)
				this.props.getQualifications();
		}

		if(this.props.user !== null && this.props.user.logged_user !== null) {
			this.api = new UserAPI();			
			this.setState({
				loading: true
			});
			await this.api.getUserProfileById({ id: this.props.match.params.id }, {mode: 'cors'})
			.then(response => {				
				if (response.status === 'success') {
					this.setState({
						profile: response.profile,
						loading: false
					});
				}
				else {
					notify.show(response.message, 'error', NotificationsTimeOut, 'red');
					this.setState({						
                        loading: false,
                        profile: resetProfile
					});
                }                
            });
		}
	}
	
	render() {
		const justify = { textAlign: 'justify' }
		const padding = {paddingRight: '10px'}
		const titlePadding = {paddingLeft: '10px'}
				
		return (
			<Fragment>
				{
					(this.state.loading) ?
					( <DetailsLoader /> )
					:
					(
						[
							(this.props.user.logged_user !== null) ?
							(
								<section className='site-content' key='2'>
									<div className='container'>
										<div className='row align-items-center justify-content-center underline'>
											<div className='col-md-12'>
												<h1 className='font-weight-bold'>User Profile</h1>                                    
											</div>
										</div>
										<div className='row align-items-center mb-5'>
											<div className='col-lg-8 mb-4 mb-lg-0'>
												<div className='d-flex align-items-center'>
													<div className='p-2 d-inline-block mr-3 rounded'>
														{/* Get user image Dynamic */}
														<AccountBoxIcon className='no-data-home' style={{ color: grey[500], fontSize: 160 }}/> 														
													</div>
													<div>
														<h2 style={titlePadding}>
															{
																( this.state.profile.firstname + this.state.profile.middlename + this.state.profile.lastname) === '' ?
																'Unknown User'
																: this.state.profile.firstname + ' ' + this.state.profile.middlename + ' ' + this.state.profile.lastname
															}
														</h2>
														<div className='container'>
															<div className='row'>
																<div className='col-12'>
																	<span className='icon-briefcase' style={padding}></span>{ DefaultDisplay(this.state.profile.designation) }
																</div>
															</div>
															<div className='row'>
																<div className='col-12'>
																	<span className='icon-room' style={padding}></span>
																	{ DefaultDisplay(this.state.profile.town) },&nbsp;{ DefaultDisplay(this.state.profile.district) },&nbsp;{ DefaultDisplay(this.state.profile.stateLocation) }
																</div>
															</div>															
														</div>
													</div>										
												</div>
											</div>											
										</div>
                                        <div className='row'>
                                            <div className='col-lg-8'>
                                                <div className='mb-5'>							
                                                <h3 className='h5 d-flex align-items-center mb-4 text-primary'><span className='icon-align-left mr-3'></span>Personal Information</h3>
                                                <div style = { justify }>
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>Date Of Birth: </strong>
																{ DefaultDisplay(moment(this.state.profile.dob, "DD/MM/YYYY").format('MMMM Do, YYYY')) }
                                                            </div>
                                                        </div>
														<br/>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>Address: </strong> 
																{ DefaultDisplay(this.state.profile.address) }
                                                            </div>
                                                        </div>
														<br/>
														<div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>PAN: </strong>
																{ DefaultDisplay(this.state.profile.pan) }
                                                            </div>
                                                        </div>
														<br/>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>Gender: </strong> 
																{ DefaultDisplay(gender.filter(gd => parseInt(gd.id) === parseInt(this.state.profile.gender))[0].view) }
                                                            </div>
                                                        </div>
														<br/>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>Father Name: </strong>
																{ DefaultDisplay(this.state.profile.fathername) }
                                                            </div>
                                                        </div>
														<br/>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'> Nationality: </strong>
																{ DefaultDisplay(this.state.profile.nationality) }
                                                            </div>
                                                        </div>
														<br/>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className='mb-5'>
                                                    <h3 className='h5 d-flex align-items-center mb-4 text-primary'>
                                                        <span className='icon-rocket mr-3'></span>Contact Information</h3>
                                                            <div className='container'>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <strong className='text-black'>Email: </strong>
																		{ DefaultDisplay(this.state.profile.email) }
                                                                    </div>
                                                                </div>
																<br/>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <strong className='text-black'> Mobile: </strong>
																		{ DefaultDisplay(this.state.profile.mobile) }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                </div>
                                        
                                                <div className='mb-5'>
                                                <h3 className='h5 d-flex align-items-center mb-4 text-primary'><span className='icon-book mr-3'></span>Education + Experience</h3>
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>Total experience: </strong>
																{ DefaultDisplay(this.state.profile.totalexperience) } months
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
											  <div className='col-lg-4'>
                                                <div className='bg-light p-3 border rounded mb-4'>
                                                <h3 className='text-primary  mt-3 h5 pl-3 mb-3 '>Profession Summary</h3>
                                                <ul className='list-unstyled pl-3 mb-0'>
                                                    <li className='mb-2'><strong className='text-black'>Current Designation:</strong> { DefaultDisplay(this.state.profile.designation) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Current Organization:</strong> { DefaultDisplay(this.state.profile.currentorganization) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Teaching Subject:</strong> { DefaultDisplay(this.state.profile.teachingsubject) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Teaching Medium:</strong> { DefaultDisplay(teachingmedium.filter(tm => parseInt(tm.id) === parseInt(this.state.profile.teachingmedium))[0].view) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Circulum:</strong> { DefaultDisplay(circulum.filter(cr => parseInt(cr.id) === parseInt(this.state.profile.circulum))[0].view) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Department:</strong> { DefaultDisplay(department.filter(dp => parseInt(dp.id) === parseInt(this.state.profile.department))[0].view) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Segment:</strong> { DefaultDisplay(segment.filter(sg => parseInt(sg.id) === parseInt(this.state.profile.segment))[0].view) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Current CTC:</strong> &#x20b9; { DefaultDisplay(this.state.profile.ctc) }</li>
                                                    <li className='mb-2'><strong className='text-black'>Expected CTC:</strong> &#x20b9; { DefaultDisplay(this.state.profile.ectc) }</li>
                                                </ul>
                                                </div>			
										      </div>											 
                                        </div>
									</div>
								</section>
							)
							:
							(
								<NoData key = '1' tag={
									<p>User details do not exist, click <Link to='/signin'>here</Link> to <ExitToAppIcon className='no-data-home' style={{ color: green[500], fontSize: 40, verticalAlign: -7 }}/> login.</p>
								} />
							)
						]						
					)
				}				
			</Fragment>
		);		
    }
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		locations: state.common.states,
		subjects: state.common.subjects,
		qualifications: state.common.qualifications
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		getStates: () => dispatch(getStates()),
		getSubjects: () => dispatch(getSubjects()),
		getQualifications: () => dispatch(getQualifications())		
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAnyProfile);
