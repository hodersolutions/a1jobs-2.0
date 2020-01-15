import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import { connect } from 'react-redux';
import { getQualifications } from '../../store/actions/commonActions';

class UserProfile extends Component {    
    state = {
        title:'',
        qualification: '', 
        experience:'',
        location:'',
        ctc:'',
        resume:'',
        experiences:[
			{
				Institution:'',
				exp:''
			}
		],
        firstname:'',
        lastname:''
	}

    componentDidMount() {
		window.scrollTo(0, 0);
    }
        
    handleChange = (e) => {
        if (['Institution', 'exp'].includes(e.target.className) ) {
			let experiences = [...this.state.experiences]
			experiences[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
			this.setState({ experiences }, () => console.log(this.state.experiences))
        } else {
			this.setState({ [e.target.name]: e.target.value.toUpperCase() })
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();        
    }

    addExperience = (e) => {
        this.setState((prevState) => ({
          experiences: [...prevState.experiences, {Institution:'', exp:''}],
        }));
      }

    render() {
        const options = {
			zIndex: 200, top: '50px'
		}
        return (
            <div>
				<div className='user-profile-section' id='next-section'>
					<Notifications options={{ options }}/>
					<form action='/userprofile' onSubmit={this.handleSubmit} method='POST'>
						<div className='container'>
							<div className='row align-items-center justify-content-center underline'>
								<div className='col-md-12'>
									<h1 className='font-weight-bold'>Update User Profile</h1>                                    
								</div>
							</div>
							<div className='row'>						
								<div className='col-12 form-group'>
									<label className='text-black' htmlFor='title'>Job title</label>
									<input type='text' id='title' name='title' className='form-control' value={this.state.title} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-3 col-xs-12 form-group'>
									<label className='text-black' htmlFor='lname'>Qualification</label>
										<select  className='form-control' id='qualification' name='qualification' value={ this.state.qualification } onChange={ this.handleChange }>										
											{
												this.props.qualifications.map((qualificationName, key) => { 
													return <option key={ key }  value={ qualificationName.id }>{ qualificationName.qualification }</option>; 
												})
											}
										</select>
								</div>
								<div className='col-lg-2 col-xs-12 form-group'>
									<label className='text-black' htmlFor='salary'>CTC</label>
									<input type='text' id='salary' name='salary' className='form-control' value={this.state.salary} onChange={this.handleChange}/>
								</div>
								<div className='col-lg-8 col-xs-12 form-group'>
									<button onClick={this.addExperience}>Add Experience</button>
									{
										this.state.experiences.map((val,idx) => {
											// let InstitutionId = 'Institution-${idx}', expid = 'exp-${idx}'
											return (
													<div className='col-lg-4 col-xs-12 form-group' key={idx}>
														{/* <label className='text-black' htmlFor={InstitutionId}> Institution </label>
														<input
															type='text'
															name={InstitutionId}
															data-idx={idx}
															id={InstitutionId}
															className='form-control'
															value={this.state.experiences[idx].Institution}
														/>
														<label className='text-black' htmlFor={expid}> Exp </label>
														<input
															type='text'
															name={expid}
															data-idx={idx}
															id={expid}
															className='form-control'
															value={this.state.experiences[idx].exp}
														/> */}
													</div>
											)
										})
									}
								</div>
								<div className='col-lg-6 col-xs-12 form-group post-job-button'>
									<span className='post-job-span'><input type='submit' value='Submit' className='btn btn-post btn-md text-white job-post-button' /></span>            						
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
		qualifications: state.common.qualifications
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		getQualifications: () => dispatch(getQualifications())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
