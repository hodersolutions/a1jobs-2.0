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
import { gender, teachingmedium, segment, department, circulum } from '../common/Constants';
import NoData from '../common/NoData';

class ViewAnyProfile extends Component {
	constructor(props) {
		super(props);
		this.api = null;
		this.state = {
			profile:{
                userid: null,
				firstname: '',
				middlename: '',
				lastname: '',
				fathername: '',
				gender: 0,    
				nationality: '',
				ctc: '',
				ectc: '',
				qualification: 0,
				stateLocation: 0,
				district: 0,
				town: 0,
				totalexperience: 0,
				circulum: 0,
				currentorganization: '',
				department: 0,
				teachingsubject: 0,
				teachingmedium: 0,
				segment: 0,
				dob:'',
				email:'',
				mobile:'',
				designation:'',
				address:'',
				pan:''
            },
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
				profile: {...this.state.profile, userid: this.props.user.logged_user.id},
				loading: true
			});
			await this.api.getUserProfileinViewProfile({ userid: this.props.match.params.id }, {mode: 'cors'})
			.then(response => {				
				if (response.status === 'success') {
					this.setState({
						profile: response.profile,
						loading: false
					});
				}
				else {
					notify.show(response.message, 'error', 5000, 'red');
					this.setState({						
						loading: false
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
				<div className='site-content'>	
				{
					(this.state.loading) ?
					( <DetailsLoader /> )
					:
					(
						[
							(this.props.user.logged_user !== null) ?
							(
								<section key='2'>
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
														<h2 style={titlePadding}>{this.state.profile.firstname + ' ' + this.state.profile.middlename + ' ' + this.state.profile.lastname}</h2>
														<div className='container'>
															<div className='row'>
																<div className='col-12'>
																	<span className='icon-briefcase' style={padding}></span>{this.state.profile.designation}
																</div>
															</div>
															<div className='row'>
																<div className='col-12'>
																	<span className='icon-room' style={padding}></span>{this.state.profile.stateLocation},&nbsp;{this.state.profile.district},&nbsp;{this.state.profile.town}
																</div>
															</div>
															{/* <div className='row'>
																<div className='col-12'>
																	Expected CTC: {this.state.profile.ectc}
																</div>
															</div> */}
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
                                                                <strong className='text-black'>Date Of Birth:</strong> {this.state.profile.dob}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>Address:</strong> {this.state.profile.address}
                                                            </div>
                                                        </div>
														<div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>PAN:</strong> {this.state.profile.pan}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'> Gender:</strong> {gender.filter(gd => parseInt(gd.id) === parseInt(this.state.profile.gender))[0].name}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'>Father Name:</strong> {this.state.profile.fathername}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <strong className='text-black'> Nationality:</strong> {this.state.profile.nationality}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className='mb-5'>
                                                    <h3 className='h5 d-flex align-items-center mb-4 text-primary'>
                                                        <span className='icon-rocket mr-3'></span>Contact Information</h3>
                                                            <div className='container'>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <strong className='text-black'>Email:</strong> {this.state.profile.email}
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <strong className='text-black'> Mobile:</strong> {this.state.profile.mobile}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                </div>
                                        
                                                <div className='mb-5'>
                                                <h3 className='h5 d-flex align-items-center mb-4 text-primary'><span className='icon-book mr-3'></span>Education + Experience</h3>
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <div className='col-14'>
                                                                <strong className='text-black'>Total years of experience:</strong> {this.state.profile.totalexperience}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
											  <div className='col-lg-4'>
                                                <div className='bg-light p-3 border rounded mb-4'>
                                                <h3 className='text-primary  mt-3 h5 pl-3 mb-3 '>Profession Summary</h3>
                                                <ul className='list-unstyled pl-3 mb-0'>
                                                    <li className='mb-2'><strong className='text-black'>Current Designation:</strong> {this.state.profile.designation}</li>
                                                    <li className='mb-2'><strong className='text-black'>Current Organization:</strong> {this.state.profile.currentorganization}</li>
                                                    <li className='mb-2'><strong className='text-black'>Teaching Subject:</strong> {this.state.profile.teachingsubject}</li>
                                                    <li className='mb-2'><strong className='text-black'>Teaching Medium:</strong> {teachingmedium.filter(tm => parseInt(tm.id) === parseInt(this.state.profile.teachingmedium))[0].name}</li>
                                                    <li className='mb-2'><strong className='text-black'>Circulum:</strong> {circulum.filter(cr => parseInt(cr.id) === parseInt(this.state.profile.circulum))[0].name}</li>
                                                    <li className='mb-2'><strong className='text-black'>Department:</strong> {department.filter(dp => parseInt(dp.id) === parseInt(this.state.profile.department))[0].name}</li>
                                                    <li className='mb-2'><strong className='text-black'>Segment:</strong> {segment.filter(sg => parseInt(sg.id) === parseInt(this.state.profile.segment))[0].name}</li>
                                                    <li className='mb-2'><strong className='text-black'>Current CTC:</strong> {this.state.profile.ctc}</li>
                                                    <li className='mb-2'><strong className='text-black'>Expected CTC:</strong> {this.state.profile.ectc}</li>
                                                </ul>
                                                </div>			
										      </div>
											  <div className='col-lg-4'>
												<div className='row'>											
													<div className='col-6'>
														<Link to='/edituser' className='btn btn-primary border-width-2 d-lg-inline-block sign-in-link'><span className='mr-2 icon-sign-in'></span>Edit Profile</Link>
													</div>
												</div>
											  </div>
                                        </div>
									</div>
								</section>
							)
							:
							(
								<NoData tag={
									<p>User details do not exist, click <Link to='/signin'>here</Link> to <ExitToAppIcon className='no-data-home' style={{ color: green[500], fontSize: 40, verticalAlign: -7 }}/> login.</p>
								} />
							)
						]						
					)
				}				
				</div>
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
