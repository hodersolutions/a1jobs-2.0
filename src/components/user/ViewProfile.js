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

class ViewProfile extends Component {
	constructor(props) {
		super(props);
		this.api = null;
		this.state = {
			profile: {
				firstname: 'N/A',
				middlename: 'N/A',
				lastname: 'N/A',
				fathername: 'N/A',
				gender: 'N/A',    
				nationality: 'N/A',
				ctc: 'N/A',
				ectc: 'N/A'
			},
			loading: false
		};
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
			await this.api.getUserProfile({ userid: this.props.user.logged_user.id }, {mode: 'cors'})
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
		const titlePadding = {
			paddingLeft: '10px'
		}
				
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
																		Father: {this.state.profile.fathername}
																	</div>
																</div>
																<div className='row'>
																	<div className='col-12'>
																		Current CTC: {this.state.profile.ctc}
																	</div>
																</div>
																<div className='row'>
																	<div className='col-12'>
																		Expected CTC: {this.state.profile.ectc}
																	</div>
																</div>
															</div>
														</div>										
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
									<section key='3'>
										<div className='container'>
											<div className='row align-items-center justify-content-center un-underline'>
												<div className='col-md-12'>
													<div className='no-data'>
														<h1 className='font-weight-bold'>
															User details do not exist, click <Link to='/signin'>here</Link> to <ExitToAppIcon className='no-data-home' style={{ color: green[500], fontSize: 40, verticalAlign: -7 }}/> login.
														</h1>
													</div>
												</div>
											</div>
										</div>
									</section>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
