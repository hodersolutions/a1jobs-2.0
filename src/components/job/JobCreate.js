import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createJob } from '../../store/actions/jobActions';
import { getStates, getSubjects } from '../../store/actions/commonActions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { notify } from 'react-notify-toast';

class JobCreate extends Component {
    state = {
		title: '', 
		type: '', 
		stateLocation: 0,
		district: 0,
		town: 0,
		organization: '',  
		subject: '',
		salary: '', 
		description: '',
		responsibilities: '',
		experience: '',
		benefits: '',
		edu_exp_details: '',
		vacancy: '',
		gender: '',
		deadline: new Date()
	}
	
	componentDidMount() {
		window.scrollTo(0, 0);
		if (this.props.locations.length === 0)
			this.props.getStates();		
		if (this.props.subjects.length === 0)
			this.props.getSubjects();		
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let errors = "";
		if (errors === "")
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
		return (
			<div>
				<div className="job-create-section" id="next-section">
					<form action="/job" onSubmit={this.handleSubmit} method="POST">
						<div className="container">
							<div className="row align-items-center justify-content-center underline">
                                <div className="col-md-12">
                                    <h1 className="font-weight-bold">Post a Job</h1>                                    
                                </div>
                            </div>
							<div className="row">						
								<div className="col-12 form-group">
									<label className="text-black" htmlFor="fname">Job title</label>
									<input type="text" id="title" name="title" className="form-control" value={this.state.title} onChange={this.handleChange}/>
								</div>								
								<div className="col-lg-3 col-xs-12 form-group">
									<label className="text-black" htmlFor="lname">Job type</label>
									<select className="form-control" id="type" name="type" value={this.state.type} onChange={this.handleChange}>
										<option disabled hidden value=""></option>
										<option value='1'>Part Time</option>
										<option value='2'>Full Time</option>
										<option value='3'>Freelancer</option>
									</select>
								</div>
								<div className="col-lg-3 col-xs-12 form-group">
									<label className="text-black" htmlFor="lname">State</label>
									<select  className="form-control" id="stateLocation" name="stateLocation" value={ this.state.stateLocation } onChange={ this.handleChange }>										
										{
											this.props.locations.map((stateName, key) => { 
												return <option key={ key }  value={ stateName.id }>{ stateName.state }</option>; 
											})
										}
									</select>
								</div>
								<div className="col-lg-3 col-xs-12 form-group">
									<label className="text-black" htmlFor="lname">District</label>
									<select className="form-control" id="district" name="district" value={ this.state.district } onChange={ this.handleChange }>										
										{											
											this.state.stateLocation > 0 && (this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))).length > 0
											&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))[0].districts.map((district, key) => { 
												return <option key={ key } value={ district.id }>{ district.name }</option>; 
											})
										}							
									</select>
								</div>
								<div className="col-lg-3 col-xs-12 form-group">
									<label className="text-black" htmlFor="lname">Town</label>
									<select className="form-control" id="town" name="town" value={ this.state.town } onChange={ this.handleChange }>										
										{
											this.state.stateLocation > 0 
											&& this.state.district > 0 
											&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id)).length > 0
											&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))[0]
											.districts.filter((districtObj) => parseInt(this.state.district) === parseInt(districtObj.id)).length > 0 
											&& this.props.locations.filter((stateObj) => parseInt(this.state.stateLocation) === parseInt(stateObj.id))[0]
											.districts.filter((districtObj) => parseInt(this.state.district) === parseInt(districtObj.id))[0]
											.towns.map((town, key) => { 
												return <option key={ key } value={ town.id }>{ town.town }</option>; 
											})
										}
									</select>
								</div>			                    
								<div className="col-lg-9 col-xs-12 form-group">
									<label className="text-black" htmlFor="lname">Organization</label>
									<select className="form-control" id="organization" name="organization" value={this.state.organization} onChange={this.handleChange}>										
									</select>
								</div>
								<div className="col-lg-4 col-xs-12 form-group">
									<label className="text-black" htmlFor="fname">Subject</label>
									<select  className="form-control" id="subject" name="subject" value={this.state.subject} onChange={this.handleChange}>																	
										{
											this.props.subjects.map((subjectName, key) => { 
												return <option key={ key } value={ subjectName.id }>{ subjectName.subject }</option>; 
											})
										}
									</select>
								</div>
								<div className="col-lg-2 col-xs-12 form-group">
									<label className="text-black" htmlFor="fname">Salary</label>
									<input type="text" id="salary" name="salary" className="form-control" value={this.state.salary} onChange={this.handleChange}/>
								</div>
								<div className="col-lg-2 col-xs-12 form-group">
									<label className="text-black" htmlFor="fname">Vacancy</label>
									<input type="text" id="vacancy" name="vacancy" className="form-control" value={this.state.vacancy} onChange={this.handleChange}/>
								</div>
								<div className="col-lg-2 col-xs-12 form-group">
									<label className="text-black" htmlFor="fname">Gender</label>
									<select className="form-control" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
										<option value='1'>Female</option>
										<option value='2'>Male</option>
										<option value='3'>Not relevant</option>
									</select>
								</div>
								<div className="col-lg-2 col-xs-12 form-group">
									<label className="text-black" htmlFor="fname">Deadline</label>
									<DatePicker
										selected={ this.state.deadline }
										onChange={date => this.handleDate(date)}
										peekNextMonth										
										showMonthDropdown
										showYearDropdown
										dateFormat="dd/MM/yyyy"
										dropdownMode="select"
										className="form-control"
									/>									
								</div>											
								<div className="col-lg-6 col-xs-12 form-group">
									<label className="text-black" htmlFor="message">Description</label>
									<textarea name="description" id="description" cols="30" rows="4" className="form-control"
										placeholder="Job description..." value={this.state.description} onChange={this.handleChange}></textarea>
								</div>
								<div className="col-lg-6 col-xs-12 form-group">
									<label className="text-black" htmlFor="message">Responsibilities</label>
									<textarea name="responsibilities" id="responsibilities" cols="30" rows="4" className="form-control"
										placeholder="Job responsibilities..." value={this.state.responsibilities} onChange={this.handleChange}></textarea>
								</div>
								<div className="col-lg-6 col-xs-12 form-group">
									<label className="text-black" htmlFor="message">Employee benefits(if any)</label>
									<textarea name="benefits" id="benefits" cols="30" rows="4" className="form-control"
										placeholder="Employee benefits(if any...)" value={this.state.benefits} onChange={this.handleChange}></textarea>
								</div>
								<div className="col-lg-6 col-xs-12 form-group">
									<label className="text-black" htmlFor="message">Education and Experience details</label>
									<textarea name="edu_exp_details" id="edu_exp_details" cols="30" rows="4" className="form-control"
										placeholder="Education and Experience details" value={this.state.edu_exp_details} onChange={this.handleChange}></textarea>
								</div>
								<div className="col-lg-6 col-xs-12 form-group post-job-button">
									<span className="post-job-span"><input type="submit" value="Post Job" className="btn btn-post btn-md text-white job-post-button" /></span>            						
								</div>
							</div>
						</div>							                
					</form>						
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		job: state.job,
		locations: state.common.states,
		subjects: state.common.subjects
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		createJob: (jobObj) => dispatch(createJob(jobObj)),
		getStates: () => dispatch(getStates()),
		getSubjects: () => dispatch(getSubjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCreate);