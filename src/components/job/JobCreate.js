import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getStates, getSubjects, getQualifications } from '../../store/actions/commonActions';
import DatePicker from 'react-datepicker';
import { Redirect } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { notify } from 'react-notify-toast';
import { gender, jobTypes, resetJob } from '../common/Constants';
import JobAPI from '../../api/JobAPI';
import moment from 'moment';
import NotificationsTimeOut from '../common/contact/Contact';

class JobCreate extends Component {
	constructor(props) {
		super(props);
		this.api = null;
		this.state = {
			job: resetJob,
			loading: false
		}
	}
    
	
	componentDidMount() {
		window.scrollTo(0, 0);
		if (this.props.user !== null) {
			if (this.props.locations.length === 0)
				this.props.getStates();		
			if (this.props.subjects.length === 0)
				this.props.getSubjects();
			if (this.props.qualifications.length === 0)
				this.props.getQualifications();	

			this.setState({ job: {...this.state.job, submitter: this.props.user.id} });
		}		
	}	

	handleChange = (e) => {
		e.preventDefault();
		this.setState({ job: {...this.state.job, [e.target.name]: e.target.value} });
	}

	handleStateChange = (e) => {
		e.preventDefault();
		this.setState({ job: {...this.state.job, [e.target.name]: e.target.value, district: 0, town: 0} });
	}

	handleDistrictChange = (e) => {
		e.preventDefault();
		this.setState({ job: {...this.state.job, [e.target.name]: e.target.value, town: 0} });
	}
	
	handleSubmit = async (e) => {
		e.preventDefault();		
		let errors = '';
		if (errors === '') {
			this.api = new JobAPI();
			this.setState({
				loading: true
			});
			await this.api.postJob(this.state.job, {mode: 'cors'})
			.then(response => {
				if(response.status === 'success') {
					notify.show(response.message, 'success', NotificationsTimeOut, 'green');
				}				
				else {
					notify.show(response.message, 'error', NotificationsTimeOut, 'red');
				}
				this.setState({ job: resetJob, loading: false });
				this.setState({ job: {...this.state.job, submitter: this.props.user.id} });
			});			
		}
		else
			notify.show(errors, 'error', NotificationsTimeOut, 'red');
	};
	
	handleDate = (date) => {		
		this.setState({ job: {...this.state.job, deadline: date } });		
	};

	render() {		
		if (this.props.user === null) {
			return (
				<Redirect to='/signin'/>
			);
		}		
		return (
			<Fragment>
				<div className='job-create-section site-content' id='next-section'>
					<form action='/job' onSubmit={this.handleSubmit} method='POST'>
						<div className='container'>
							<div className='row align-items-center justify-content-center underline'>
								<span>
									{
										(this.state.loading) ?
										( 
											<Fragment key='1'>
												<img src={require('../../static/images/loading/loading_gear.gif')} alt='Login' width='45' height='45'/>
												<h1 className='display-inline font-weight-bold'>Posting a Job...</h1>
											</Fragment>
										)
										:
										( <h1 className='font-weight-bold'>Post a Job</h1> )	
									}
								</span>
							</div>
							<div className='row'>						
								<div className='col-12 form-group'>
									<label className='text-black' htmlFor='title'>Job title</label>
									<input type='text' id='title' name='title' className='form-control' value={this.state.job.title} onChange={this.handleChange}/>
								</div>								
								<div className='col-lg-3 col-xs-12 form-group'>
									<label className='text-black' htmlFor='jobtype'>Job type</label>
									<select className='form-control' id='jobtype' name='jobtype' value={this.state.job.jobtype} onChange={this.handleChange}>
										{
											jobTypes.map((jobtype, key) => { 
												return <option key={ key }  value={ jobtype.id }>{ jobtype.name }</option>; 
											})
										}
									</select>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
									<label className='text-black' htmlFor='stateLocation'>State</label>
									<select  className='form-control' id='stateLocation' name='stateLocation' value={ this.state.job.stateLocation } onChange={ this.handleStateChange }>										
										{
											this.props.locations.map((stateName, key) => {
												let options = [];
												if(key === 0)
													options = [<option key={ key + 1 }  value={ stateName.id }>Select state...</option>];
												else
													options = [<option key={ key + 1 }  value={ stateName.id }>{ stateName.state }</option>]
												return options;
											})
										}
									</select>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
									<label className='text-black' htmlFor='district'>District</label>
									<select className='form-control' id='district' name='district' value={ this.state.job.district } onChange={ this.handleDistrictChange }>										
										{											
											this.state.job.stateLocation > 0 && (this.props.locations.filter((stateObj) => parseInt(this.state.job.stateLocation) === parseInt(stateObj.id))).length > 0
											&& this.props.locations.filter((stateObj) => parseInt(this.state.job.stateLocation) === parseInt(stateObj.id))[0].districts.map((district, key) => { 												
												let options = [];
												if(key === 0)
													options = [<option key={ key + 1 } value={ district.id }>Select district...</option>]
												else
													options = [<option key={ key + 1 } value={ district.id }>{ district.name }</option>]
												return options;
											})
										}							
									</select>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
									<label className='text-black' htmlFor='town'>Town</label>
									<select className='form-control' id='town' name='town' value={ this.state.job.town } onChange={ this.handleChange }>										
										{
											this.state.job.stateLocation > 0 
											&& this.state.job.district > 0 
											&& this.props.locations.filter((stateObj) => parseInt(this.state.job.stateLocation) === parseInt(stateObj.id)).length > 0
											&& this.props.locations.filter((stateObj) => parseInt(this.state.job.stateLocation) === parseInt(stateObj.id))[0]
											.districts.filter((districtObj) => parseInt(this.state.job.district) === parseInt(districtObj.id)).length > 0 
											&& this.props.locations.filter((stateObj) => parseInt(this.state.job.stateLocation) === parseInt(stateObj.id))[0]
											.districts.filter((districtObj) => parseInt(this.state.job.district) === parseInt(districtObj.id))[0]
											.towns.map((town, key) => {
												let options = [];
												if(key === 0)
													options = [<option key={ key + 1 } value={ town.id }>Select town...</option>]
												else
													options = [<option key={ key + 1 } value={ town.id }>{ town.town }</option>]
												return options;												
											})
										}
									</select>
								</div>			                    
								<div className='col-lg-8 col-xs-12 form-group'>
									<label className='text-black' htmlFor='institution'>Institution / School</label>
									<input type='text' id='institution' name='institution' className='form-control' value={this.state.job.institution} onChange={this.handleChange}/>
								</div>
								<div className="col-lg-3 col-xs-12 form-group">
									<label className="text-black" htmlFor="lname">Qualification</label>
										<select  className="form-control" id="qualification" name="qualification" value={ this.state.job.qualification } onChange={ this.handleChange }>
											{
												this.props.qualifications.map((qualificationName, key) => {
													let options = [];
													if(key === 0)
														options = [<option key={ key } value={ qualificationName.id }>Select qualification...</option>];
													else
														options = [<option key={ key + 1 } value={ qualificationName.id }>{ qualificationName.qualification }</option>];
													return options;
												})
											}
										</select>
								</div>
								<div className='col-lg-4 col-xs-12 form-group'>
									<label className='text-black' htmlFor='subject'>Subject</label>
									<select  className='form-control' id='subject' name='subject' value={this.state.job.subject} onChange={this.handleChange}>																	
										{
											this.props.subjects.map((subjectName, key) => {
												let options = [];
												if(key === 0)
													options = [<option key={ key } value={ subjectName.id }>Select subject...</option>];
												else
													options = [<option key={ key + 1 } value={ subjectName.id }>{ subjectName.subject }</option>];
												return options;
											})
										}
									</select>
								</div>
								<div className='col-lg-2 col-xs-12 form-group'>
									<label className='text-black' htmlFor='salary'>Salary</label>
									<input type='text' id='salary' name='salary' className='form-control' value={this.state.job.salary} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-2 col-xs-12 form-group'>
									<label className='text-black' htmlFor='vacancy'>Vacancy</label>
									<input type='text' id='vacancy' name='vacancy' className='form-control' value={this.state.job.vacancy} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-2 col-xs-12 form-group'>
									<label className='text-black' htmlFor='gender'>Gender</label>
									<select className='form-control' id='gender' name='gender' value={this.state.job.gender} onChange={this.handleChange}>
										{
											gender.map((genderType, key) => { 
												return <option key={ key }  value={ genderType.id }>{ genderType.name }</option>; 
											})
										}
									</select>
								</div>
								<div className='col-lg-2 col-xs-12 form-group'>
									<label className='text-black' htmlFor='deadline'>Deadline</label>
									<DatePicker
										selected={ moment(this.state.job.deadline, 'DD/MM/YYYY').toDate() }
										onChange={ date => this.handleDate(date.toLocaleDateString('en-IN')) }
										peekNextMonth										
										showMonthDropdown
										showYearDropdown
										dateFormat='dd/MM/yyyy'
										dropdownMode='select'
										className='form-control'
									/>									
								</div>

								<div className='col-lg-4 col-xs-12 form-group'>
									<label className='text-black' htmlFor='telephone'>Contact number</label>
									<input type='text' id='telephone' name='telephone' className='form-control' value={this.state.job.telephone} onChange={this.handleChange}/>
								</div>

								<div className='col-lg-4 col-xs-12 form-group'>
									<label className='text-black' htmlFor='minexperience'>Minimum Experience(in months)</label>
									<input type='text' id='minexperience' name='minexperience' className='form-control' value={this.state.job.minexperience} onChange={this.handleChange}/>
								</div>

								<div className='col-lg-4 col-xs-12 form-group'>
									<label className='text-black' htmlFor='maxexperience'>Maximum Experience(in months)</label>
									<input type='text' id='maxexperience' name='maxexperience' className='form-control' value={this.state.job.maxexperience} onChange={this.handleChange}/>
								</div>

								<div className='col-lg-6 col-xs-12 form-group'>
									<label className='text-black' htmlFor='requisitiondetails'>Description</label>
									<textarea name='requisitiondetails' id='requisitiondetails' cols='30' rows='4' className='form-control'
										placeholder='Job description...' value={this.state.job.requisitiondetails} onChange={this.handleChange}></textarea>
								</div>
								<div className='col-lg-6 col-xs-12 form-group'>
									<label className='text-black' htmlFor='responsibilities'>Responsibilities</label>
									<textarea name='responsibilities' id='responsibilities' cols='30' rows='4' className='form-control'
										placeholder='Job responsibilities...' value={this.state.job.responsibilities} onChange={this.handleChange}></textarea>
								</div>
								<div className='col-lg-6 col-xs-12 form-group'>
									<label className='text-black' htmlFor='benefits'>Employee benefits(if any)</label>
									<textarea name='benefits' id='benefits' cols='30' rows='4' className='form-control'
										placeholder='Employee benefits(if any...)' value={this.state.job.benefits} onChange={this.handleChange}></textarea>
								</div>
								<div className='col-lg-6 col-xs-12 form-group'>
									<label className='text-black' htmlFor='eduexpdetails'>Education and Experience details</label>
									<textarea name='eduexpdetails' id='eduexpdetails' cols='30' rows='4' className='form-control'
										placeholder='Education and Experience details' value={this.state.job.eduexpdetails} onChange={this.handleChange}></textarea>
								</div>
								<div className='col-lg-6 col-xs-12 form-group post-job-button'>
									<span className='post-job-span'><input type='submit' value='Post Job' className='btn btn-post-page btn-md text-white job-post-button' /></span>            						
								</div>
							</div>
						</div>							                
					</form>						
				</div>				
			</Fragment>			
		)
	}
}


const mapStateToProps = (state) => {
	return {
		job: state.job,
		user: state.user.logged_user,
		locations: state.common.states,
		subjects: state.common.subjects,
		qualifications: state.common.qualifications,
		loading: state.common.loading		
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		getStates: () => dispatch(getStates()),
		getSubjects: () => dispatch(getSubjects()),
		getQualifications: () => dispatch(getQualifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCreate);

