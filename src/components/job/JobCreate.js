import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createJob } from '../../store/actions/jobActions';
import { getStates, getSubjects, getQualifications } from '../../store/actions/commonActions';
import DatePicker from 'react-datepicker';
import { Redirect } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Notifications, { notify } from 'react-notify-toast';
import Loading from '../common/loading/Loading';
import {CREATE_JOB_SUCCESS, CREATE_JOB_ERROR} from '../../store/types/jobTypes';
import { gender, jobTypes, resetDistrict, resetState, resetTown, resetSubject, resetJob, resetQualification } from '../common/Constants';

class JobCreate extends Component {
    state = {
		title: '', 
		jobtype: '', 
		stateLocation: 0,
		district: 0,
		town: 0,
		institution: '',
		subject: '',
		salary: '', 
		requisitiondetails: '',
		telephone: '',
		minexperience: '',
		maxexperience: '',
		responsibilities: '',
		experience: '',
		benefits: '',
		eduexpdetails: '',
		vacancy: '',
		gender: '',
		submitter: 0,
		deadline: new Date(),
		qualification: 0
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

			this.setState({
				submitter: this.props.user.id
			})
		}
	}

	handleReset = () => {
		this.setState(resetJob);
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleStateChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
			district: 0,
			town: 0
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();		
		let errors = '';
		if (errors === '')
			this.props.createJob(this.state);
		else
			notify.show(errors, 'error', 3000, 'red');
	};
	
	handleDate = (date) => {		
		this.setState({
			deadline: date
		});
	};

	render() {
		const options = {
			zIndex: 200, top: '50px'
		}
		if (this.props.user === null) {
			return (
				<Redirect to='/signin'/>
			);
		}
		else if (this.props.job.status === CREATE_JOB_ERROR) {
			notify.show('Unable to Post the job', 'error', 3000, 'red');
		}
		else if (this.props.job.status === CREATE_JOB_SUCCESS) {
			return (
				<Redirect to='/jobs'/>
			);
		}
		return (
			<div>
				{ this.props.loading === true ? <Loading /> : 
					<div className='job-create-section' id='next-section'>
						<Notifications options={{ options }}/>
						<form action='/createjob' onSubmit={this.handleSubmit} method='POST'>
							<div className='container'>
								<div className='row align-items-center justify-content-center underline'>
									<div className='col-md-12'>
										<h1 className='font-weight-bold'>Post a Job</h1>                                    
									</div>
								</div>
								<div className='row'>						
									<div className='col-12 form-group'>
										<label className='text-black' htmlFor='title'>Job title</label>
										<input type='text' id='title' name='title' className='form-control' value={this.state.title} onChange={this.handleChange}/>
									</div>								
									<div className='col-lg-3 col-xs-12 form-group'>
										<label className='text-black' htmlFor='jobtype'>Job type</label>
										<select className='form-control' id='jobtype' name='jobtype' value={this.state.jobtype} onChange={this.handleChange}>
											{
												jobTypes.map((jobtype, key) => { 
													return <option key={ key }  value={ jobtype.id }>{ jobtype.name }</option>; 
												})
											}
										</select>
									</div>
									<div className='col-lg-3 col-xs-12 form-group'>
										<label className='text-black' htmlFor='stateLocation'>State</label>
										<select  className='form-control' id='stateLocation' name='stateLocation' value={ this.state.stateLocation } onChange={ this.handleStateChange }>										
											{
												this.props.locations.map((stateName, key) => {
													let options = [<option key={ key + 1 }  value={ stateName.id }>{ stateName.state }</option>];
													if(key === 0)
														options.unshift(<option key={ key } value={ resetState.id }>{ resetState.state }</option>);
													return options;
												})
											}
										</select>
									</div>
									<div className='col-lg-3 col-xs-12 form-group'>
										<label className='text-black' htmlFor='district'>District</label>
										<select className='form-control' id='district' name='district' value={ this.state.district } onChange={ this.handleChange }>										
											{											
												this.state.stateLocation > 0 && (this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))).length > 0
												&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))[0].districts.map((district, key) => { 												
													let options = [<option key={ key + 1 } value={ district.id }>{ district.name }</option>];
													if(key === 0)
														options.unshift(<option key={ key } value={ resetDistrict.id }>{ resetDistrict.name }</option>);
													return options;
												})
											}							
										</select>
									</div>
									<div className='col-lg-3 col-xs-12 form-group'>
										<label className='text-black' htmlFor='town'>Town</label>
										<select className='form-control' id='town' name='town' value={ this.state.town } onChange={ this.handleChange }>										
											{
												this.state.stateLocation > 0 
												&& this.state.district > 0 
												&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id)).length > 0
												&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))[0]
												.districts.filter((districtObj) => parseInt(this.state.district) === parseInt(districtObj.id)).length > 0 
												&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))[0]
												.districts.filter((districtObj) => parseInt(this.state.district) === parseInt(districtObj.id))[0]
												.towns.map((town, key) => {
													let options = [<option key={ key + 1 } value={ town.id }>{ town.town }</option>];
													if(key === 0)
														options.unshift(<option key={ key } value={ resetTown.id }>{ resetTown.town }</option>);
													return options;												
												})
											}
										</select>
									</div>			                    
									<div className='col-lg-8 col-xs-12 form-group'>
										<label className='text-black' htmlFor='institution'>Institution / School</label>
										<input type='text' id='institution' name='institution' className='form-control' value={this.state.institution} onChange={this.handleChange}/>
									</div>
									<div className="col-lg-3 col-xs-12 form-group">
										<label className="text-black" htmlFor="lname">Qualification</label>
											<select  className="form-control" id="qualification" name="qualification" value={ this.state.qualification } onChange={ this.handleChange }>
												{
													this.props.qualifications.map((qualificationName, key) => {
														let options = [<option key={ key + 1 } value={ qualificationName.id }>{ qualificationName.qualification }</option>];
														if(key === 0)
															options.unshift(<option key={ key } value={ resetQualification.id }>{ resetQualification.qualification }</option>);													
														return options;
													})
												}												
											</select>
									</div>
									<div className='col-lg-4 col-xs-12 form-group'>
										<label className='text-black' htmlFor='subject'>Subject</label>
										<select  className='form-control' id='subject' name='subject' value={this.state.subject} onChange={this.handleChange}>																	
											{
												this.props.subjects.map((subjectName, key) => {
													let options = [<option key={ key + 1 } value={ subjectName.id }>{ subjectName.subject }</option>];
													if(key === 0)
														options.unshift(<option key={ key } value={ resetSubject.id }>{ resetSubject.subject }</option>);													
													return options;
												})
											}
										</select>
									</div>
									<div className='col-lg-2 col-xs-12 form-group'>
										<label className='text-black' htmlFor='salary'>Salary</label>
										<input type='text' id='salary' name='salary' className='form-control' value={this.state.salary} onChange={this.handleChange}/>
									</div>
									<div className='col-lg-2 col-xs-12 form-group'>
										<label className='text-black' htmlFor='vacancy'>Vacancy</label>
										<input type='text' id='vacancy' name='vacancy' className='form-control' value={this.state.vacancy} onChange={this.handleChange}/>
									</div>
									<div className='col-lg-2 col-xs-12 form-group'>
										<label className='text-black' htmlFor='gender'>Gender</label>
										<select className='form-control' id='gender' name='gender' value={this.state.gender} onChange={this.handleChange}>
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
											selected={ this.state.deadline }
											onChange={date => this.handleDate(date)}
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
										<input type='text' id='telephone' name='telephone' className='form-control' value={this.state.telephone} onChange={this.handleChange}/>
									</div>

									<div className='col-lg-4 col-xs-12 form-group'>
										<label className='text-black' htmlFor='minexperience'>Minimum Experience(in months)</label>
										<input type='text' id='minexperience' name='minexperience' className='form-control' value={this.state.minexperience} onChange={this.handleChange}/>
									</div>

									<div className='col-lg-4 col-xs-12 form-group'>
										<label className='text-black' htmlFor='maxexperience'>Maximum Experience(in months)</label>
										<input type='text' id='maxexperience' name='maxexperience' className='form-control' value={this.state.maxexperience} onChange={this.handleChange}/>
									</div>

									<div className='col-lg-6 col-xs-12 form-group'>
										<label className='text-black' htmlFor='requisitiondetails'>Description</label>
										<textarea name='requisitiondetails' id='requisitiondetails' cols='30' rows='4' className='form-control'
											placeholder='Job description...' value={this.state.requisitiondetails} onChange={this.handleChange}></textarea>
									</div>
									<div className='col-lg-6 col-xs-12 form-group'>
										<label className='text-black' htmlFor='responsibilities'>Responsibilities</label>
										<textarea name='responsibilities' id='responsibilities' cols='30' rows='4' className='form-control'
											placeholder='Job responsibilities...' value={this.state.responsibilities} onChange={this.handleChange}></textarea>
									</div>
									<div className='col-lg-6 col-xs-12 form-group'>
										<label className='text-black' htmlFor='benefits'>Employee benefits(if any)</label>
										<textarea name='benefits' id='benefits' cols='30' rows='4' className='form-control'
											placeholder='Employee benefits(if any...)' value={this.state.benefits} onChange={this.handleChange}></textarea>
									</div>
									<div className='col-lg-6 col-xs-12 form-group'>
										<label className='text-black' htmlFor='eduexpdetails'>Education and Experience details</label>
										<textarea name='eduexpdetails' id='eduexpdetails' cols='30' rows='4' className='form-control'
											placeholder='Education and Experience details' value={this.state.eduexpdetails} onChange={this.handleChange}></textarea>
									</div>
									<div className='col-lg-6 col-xs-12 form-group post-job-button'>
										<span className='post-job-span'><input type='submit' value='Post Job' className='btn btn-post-page btn-md text-white job-post-button' /></span>            						
									</div>
								</div>
							</div>							                
						</form>						
					</div>
				}
			</div>			
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
		createJob: (jobObj) => dispatch(createJob(jobObj)),
		getStates: () => dispatch(getStates()),
		getSubjects: () => dispatch(getSubjects()),
		getQualifications: () => dispatch(getQualifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCreate);