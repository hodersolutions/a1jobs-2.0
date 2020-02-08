import React, { Component, Fragment } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { getStates, getSubjects, getQualifications } from '../../store/actions/commonActions';
import { gender, circulum, teachingmedium, department, segment, resetQualification, resetState, resetTown, resetSubject, resetDistrict } from '../common/Constants';
import { Redirect } from 'react-router-dom';
import UserAPI from '../../api/UserAPI';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.api = null;
		this.state = {
			profile: {
				userid: null,
				firstname: '',
				middlename: '',
				lastname: '',
				fathername: '',
				gender: '',    
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
				address:'',
				dob: new Date().toLocaleDateString(),
				pan: '',
				designation: ''

			},
			editing: false
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
				profile: {...this.state.profile, userid: this.props.user.logged_user.id},
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
        
    handleChange = (e) => {
		this.setState({ profile: {...this.state.profile, [e.target.name]: e.target.value} })
    }
	
	handleStateChange = (e) => {
		e.preventDefault();
		this.setState({ profile: {...this.state.profile, [e.target.name]: e.target.value, district: 0, town: 0} });
	}

	handleDistrictChange = (e) => {
		e.preventDefault();
		this.setState({ profile: {...this.state.profile, [e.target.name]: e.target.value, town: 0} });
	}

    handleSubmit = async (e) => {
		e.preventDefault();
		if(this.props.user !== null && this.props.user.logged_user !== null) {
			this.api = new UserAPI();
			this.setState({
				editing: true
			});			
			await this.api.updateUserProfile(this.state.profile, {mode: 'cors'})
			.then(response => {
					if(response.status === 'success')
						notify.show(response.message, 'success', 5000, 'green');
					else
						notify.show(response.message, 'error', 5000, 'red');
					this.setState({
						editing: false
					});		
				}
			)			
		}
	}

	handleDate = (date) => {		
		this.setState({ profile: {...this.state.profile, dob: date} });
	};

    render() {        
		if (this.props.user.logged_user === null) {
			return (
				<Redirect to='/signin'/>
			);
		}
        return (
            <Fragment>
				<div id='next-section' className='site-content'>					
					<form action='/user' onSubmit={this.handleSubmit} method='POST'>
						<div className='container'>
							<div className='row align-items-center justify-content-center underline'>
								<span>
									{
										(this.state.loading) ?
										(
											<Fragment key='1'>
												<img src={require('../../static/images/loading/loading_gear.gif')} alt='Login' width='45' height='45'/>
												<h1 className='display-inline font-weight-bold'>Loading Profile</h1>
											</Fragment>
										)
										:
										(
											[(this.state.editing) ?
											(
												<Fragment key='2'>
													<img src={require('../../static/images/loading/loading_gear.gif')} alt='Login' width='45' height='45'/>
													<h1 className='display-inline font-weight-bold'>Editing Profile</h1>
												</Fragment>
											)
											:
											(
												<h1 className='font-weight-bold' key='3'>Edit Profile</h1>
											)]
										)	
									}
								</span>
							</div>
							<div>
							<div className='row align-items-center justify-content-left underline'>
								<span>
									<h3 className='font-weight-bold'>Personal Info</h3>
								</span>
							</div>
							<div className='row'>	
								<div className='col-lg-4 col-xs-12 form-group'>
									<label className='text-black' htmlFor='firstname'>Firstname</label>
									<input type='text' id='firstname' name='firstname' className='form-control' value={this.state.profile.firstname} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-4 col-xs-12 form-group'>
									<label className='text-black' htmlFor='lastname'>Lastname</label>
									<input type='text' id='lastname' name='lastname' className='form-control' value={this.state.profile.lastname} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-4 col-xs-12 form-group'>
									<label className='text-black' htmlFor='middlename'>Middlename</label>
									<input type='text' id='middlename' name='middlename' className='form-control' value={this.state.profile.middlename} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-7 col-xs-12 form-group'>
									<label className='text-black' htmlFor='fathername'>Fathername</label>
									<input type='text' id='fathername' name='fathername' className='form-control' value={this.state.profile.fathername} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-5 col-xs-12 form-group'>
									<label className='text-black' htmlFor='address'>PAN</label>
										{ 
											(this.state.profile.pan) ?
											<input type='text' id='pan' name='pan' className='form-control' value={this.state.profile.pan.toUpperCase()} onChange={this.handleChange}/>
											:
											<input type='text' id='pan' name='pan' className='form-control' value={this.state.profile.pan} onChange={this.handleChange}/>
									    }
										
								</div>
								<div className='col-lg-6 col-xs-12 form-group'>
									<label className='text-black' htmlFor='address'>Address</label>
									<textarea name='address' id='address' cols='30' rows='4' className='form-control'
										placeholder='Address' value={this.state.profile.address} onChange={this.handleChange}></textarea>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
									<label className='text-black' htmlFor='deadline'>Date Of Birth</label>
									<DatePicker										
										selected = { moment(this.state.profile.dob).toDate() }
										onChange={date => this.handleDate(date.toLocaleDateString())}
										peekNextMonth										
										showMonthDropdown
										showYearDropdown
										dateFormat='dd/MM/yyyy'
										dropdownMode='select'
										className='form-control'
									/>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
										<label className='text-black' htmlFor='gender'>Gender</label>
										<select className='form-control' id='gender' name='gender' value={this.state.profile.gender} onChange={this.handleChange}>
											{
												gender.map((genderType, key) => { 
													return <option key={ key }  value={ genderType.id }>{ genderType.name }</option>; 
												})
											}
										</select>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
									<label className='text-black' htmlFor='nationality'>Nationality</label>
									<input type='text' id='nationality' name='nationality' className='form-control' value={this.state.profile.nationality} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
										<label className='text-black' htmlFor='stateLocation'>State</label>
										<select  className='form-control' id='stateLocation' name='stateLocation' value={ this.state.profile.stateLocation } onChange={ this.handleStateChange }>										
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
										<select className='form-control' id='district' name='district' value={ this.state.profile.district } onChange={ this.handleDistrictChange }>										
											{											
												this.state.profile.stateLocation > 0 && (this.props.locations.filter((stateObj) => parseInt(this.state.profile.stateLocation) === parseInt(stateObj.id))).length > 0
												&& this.props.locations.filter((stateObj) => parseInt(this.state.profile.stateLocation) === parseInt(stateObj.id))[0].districts.map((district, key) => { 												
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
										<select className='form-control' id='town' name='town' value={ this.state.profile.town } onChange={ this.handleChange }>										
											{
												this.state.profile.stateLocation > 0 
												&& this.state.profile.district > 0 
												&& this.props.locations.filter((stateObj) => parseInt(this.state.profile.stateLocation) === parseInt(stateObj.id)).length > 0
												&& this.props.locations.filter((stateObj) => parseInt(this.state.profile.stateLocation) === parseInt(stateObj.id))[0]
												.districts.filter((districtObj) => parseInt(this.state.profile.district) === parseInt(districtObj.id)).length > 0 
												&& this.props.locations.filter((stateObj) => parseInt(this.state.profile.stateLocation) === parseInt(stateObj.id))[0]
												.districts.filter((districtObj) => parseInt(this.state.profile.district) === parseInt(districtObj.id))[0]
												.towns.map((town, key) => {
													let options = [<option key={ key + 1 } value={ town.id }>{ town.town }</option>];
													if(key === 0)
														options.unshift(<option key={ key } value={ resetTown.id }>{ resetTown.town }</option>);
													return options;												
												})
											}
										</select>
									</div>	
								</div>
								<br />
								<div className='row align-items-center justify-content-left underline'>
									<span>
										<h3 className='font-weight-bold'>Contact Info</h3>
									</span>
								</div>
								<div className = "row">
									<div className='col-lg-6 col-xs-12 form-group'>
										<label className='text-black' htmlFor='email'>Email</label>
										<input type='text' id='email' disabled={true} name='email' className='form-control' value={this.props.user.logged_user.email}/>
									</div>
									<div className='col-lg-4 col-xs-12 form-group'>
										<label className='text-black' htmlFor='mobile'>Mobile</label>
										<input type='text' id='mobile' disabled={true} name='mobile' className='form-control' value={this.props.user.logged_user.mobile}/>
									</div>
								</div>
								<br />
								<div className='row align-items-center justify-content-left underline'>
									<span>
										<h3 className='font-weight-bold'>Professional Info</h3>
									</span>
								</div>
								<div className = "row">
									<div className="col-lg-4 col-xs-12 form-group">
											<label className="text-black" htmlFor="qualification">Qualification</label>
												<select  className="form-control" id="qualification" name="qualification" value={ this.state.profile.qualification } onChange={ this.handleChange }>
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
											<label className='text-black' htmlFor='teachingsubject'>Teaching Subject</label>
											<select  className='form-control' id='teachingsubject' name='teachingsubject' value={this.state.profile.teachingsubject} onChange={this.handleChange}>																	
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
										<div className='col-lg-4 col-xs-12 form-group'>
											<label className='text-black' htmlFor='designation'>Current Designation</label>
											<input type='text' id='designation' name='designation' className='form-control' value={this.state.profile.designation} onChange={this.handleChange}/>
										</div>
										<div className='col-lg-8 col-xs-12 form-group'>
											<label className='text-black' htmlFor='currentorganization'>Current Organization</label>
											<input type='text' id='currentorganization' name='currentorganization' className='form-control' value={this.state.profile.currentorganization} onChange={this.handleChange}/>
										</div>
										<div className='col-lg-4 col-xs-12 form-group'>
											<label className='text-black' htmlFor='circulum'>Circulum</label>
											<select className='form-control' id='circulum' name='circulum' value={this.state.profile.circulum} onChange={this.handleChange}>
												{
													circulum.map((circulumType, key) => { 
														return <option key={ key }  value={ circulumType.id }>{ circulumType.name }</option>; 
													})
												}
											</select>
										</div>
										<div className='col-lg-4 col-xs-12 form-group'>
											<label className='text-black' htmlFor='department'>Department</label>
											<select className='form-control' id='department' name='department' value={this.state.profile.department} onChange={this.handleChange}>
												{
													department.map((departmentType, key) => { 
														return <option key={ key }  value={ departmentType.id }>{ departmentType.name }</option>; 
													})
												}
											</select>
										</div>
										<div className='col-lg-4 col-xs-12 form-group'>
											<label className='text-black' htmlFor='segment'>Segment</label>
											<select className='form-control' id='segment' name='segment' value={this.state.profile.segment} onChange={this.handleChange}>
												{
													segment.map((segmentType, key) => { 
														return <option key={ key }  value={ segmentType.id }>{ segmentType.name }</option>; 
													})
												}
											</select>
										</div>
										<div className='col-lg-4 col-xs-12 form-group'>
											<label className='text-black' htmlFor='teachingmedium'>Teaching Medium</label>
											<select className='form-control' id='teachingmedium' name='teachingmedium' value={this.state.profile.teachingmedium} onChange={this.handleChange}>
												{
													teachingmedium.map((teachingmediumType, key) => { 
														return <option key={ key }  value={ teachingmediumType.id }>{ teachingmediumType.name }</option>; 
													})
												}
											</select>
										</div>
										<div className='col-lg-3 col-xs-12 form-group'>
											<label className='text-black' htmlFor='totalexperience'>Total Experience(in months)</label>
											<input type='text' id='totalexperience' name='totalexperience' className='form-control' value={this.state.profile.totalexperience} onChange={this.handleChange}/>
										</div>
										<div className='col-lg-3 col-xs-12 form-group'>
											<label className='text-black' htmlFor='ctc'>Current CTC</label>
											<input type='text' id='ctc' name='ctc' className='form-control' value={this.state.profile.ctc} onChange={this.handleChange}/>
										</div>
										<div className='col-lg-3 col-xs-12 form-group'>
											<label className='text-black' htmlFor='ectc'>Expected CTC</label>
											<input type='text' id='ectc' name='ectc' className='form-control' value={this.state.profile.ectc} onChange={this.handleChange}/>
										</div>								
										<div className='col-lg-6 col-xs-12 form-group post-job-button'>
											<span className='save-span'><input type='submit' value='Save Profile' className='btn btn-post-page btn-md text-white job-post-button' onClick={this.handleSubmit}/></span>            						
										</div>
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


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
