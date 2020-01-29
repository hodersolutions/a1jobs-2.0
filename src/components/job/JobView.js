import React, { Component, Fragment } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { gender, jobTypes } from '../common/Constants';
import DetailsLoader from '../common/loading/DetailsLoader';
import HomeIcon from '@material-ui/icons/Home';
import { green } from '@material-ui/core/colors';
import JobAPI from '../../api/JobAPI';
import NoData from '../common/NoData';

class JobView extends Component {
	constructor(props) {
		super(props);
		this.api = null;
		this.state = {
			job: null,
			loading: true
		}
		this.handleApply = this.handleApply.bind(this);
	}

    async componentDidMount() {
		window.scrollTo(0, 0);
		this.api = new JobAPI();			
		this.setState({
			loading: true
		});
		await this.api.getJob({ id: this.props.match.params.id, userid: (this.props.user.logged_user !== null ? this.props.user.logged_user.id : null) }, {mode: 'cors'})
		.then(response => {				
			if (response.status === 'success') {
				this.setState({
					job: response.requisition,
					loading: false
				});
			}
			else {
				notify.show(response.message, 'error', 5000, 'red');
				this.setState({						
					loading: false,
					job: null
				});
			}
		});		
	}
	
	handleApply = (e) => {
		e.preventDefault();
		if(this.props.user.logged_user === null)
			this.props.history.push('/signin');
		else
			this.api.applyJob({ userid: this.props.user.logged_user.id, requisitionid: this.props.match.params.id })
			.then(response => {				
				if (response.status === 'success') {
					notify.show(response.message, 'success', 5000, 'green');
					this.setState({ job: {...this.state.job, isapplied: true} })
				}				
				else
					notify.show(response.message, 'error', 5000, 'red');
			});
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
								(this.state.job !== null) ?
								(
									<section key='2'>
										<div className='container'>
											<div className='row align-items-center justify-content-center underline'>
												<div className='col-md-12'>
													<h1 className='font-weight-bold'>Job details</h1>                                    
												</div>
											</div>
											<div className='row align-items-center mb-5'>
											<div className='col-lg-8 mb-4 mb-lg-0'>
												<div className='d-flex align-items-center'>
												<div className='border p-2 d-inline-block mr-3 rounded'>
													{/* Get school logo Dynamic */}
													<img className='mb-3' src={require('../../static/images/school.png')} alt='Login' width='100' height='100'/>
												</div>
												<div>
													<h2 style={titlePadding}>{this.state.job.title}</h2>
													<div className='container'>
														<div className='row'>
															<div className='col-12'>
																<span className='icon-briefcase' style={padding}></span>{this.state.job.institution}								
															</div>
														</div>
														<div className='row'>
															<div className='col-12'>
																<span className='icon-room' style={padding}></span>{this.state.job.town}, {this.state.job.district}, {this.state.job.state}
															</div>
														</div>
														<div className='row'>
															<div className='col-12'>
																<span className='icon-clock-o' style={padding}></span><span>{jobTypes.filter(type => parseInt(type.id) === parseInt(this.state.job.jobtype))[0].name}</span>
															</div>
														</div>
													</div>
												</div>
												</div>
											</div>
											<div className='col-lg-4'>
												<div className='row'>								
												<div className='col-6'>
													<Link to='#' className='btn btn-block btn-light btn-md save-job'>
														<span className='icon-heart-o mr-2 text-danger'></span>Save Job
													</Link>
												</div>
												<div className='col-6'>
													{ 
														this.props.user.logged_user !== null ? 
														(
															this.props.user.logged_user.is_recruiter ? 
															(
																<Link to= { '/jobs/appliedusers/' + this.props.match.params.id } className='btn btn-block btn-primary'>View Applicants</Link> 
															)
															:
															[
																this.state.job.isapplied ? 
																( <span className='application-sent'>Application Sent</span> )
																:
																( <input type='button' value='Apply Now' className='btn btn-block btn-primary btn-md' onClick={this.handleApply}/> )
															]
														)
														:
														<input type='button' value='Apply Now' className='btn btn-block btn-primary btn-md' onClick={this.handleApply}/>											
													}												
												</div>											
												</div>
											</div>
											</div>
											<div className='row'>
											<div className='col-lg-8'>
												<div className='mb-5'>							
												<h3 className='h5 d-flex align-items-center mb-4 text-primary'><span className='icon-align-left mr-3'></span>Job Description</h3>
												<div style = { justify }>
													{
														this.state.job.requisitiondetails
													}
												</div>
												</div>
												<div className='mb-5'>
													<h3 className='h5 d-flex align-items-center mb-4 text-primary'>
														<span className='icon-rocket mr-3'></span>Responsibilities</h3>
														<ul className='list-unstyled m-0 p-0'>
															<li className='d-flex align-items-start mb-2'><span
																className='icon-check_circle mr-2 text-muted'></span><span>{this.state.job.responsibilities}</span>
															</li>
														</ul>
												</div>
										
												<div className='mb-5'>
												<h3 className='h5 d-flex align-items-center mb-4 text-primary'><span className='icon-book mr-3'></span>Education + Experience</h3>
													<ul className='list-unstyled m-0 p-0'>
														<li className='d-flex align-items-start mb-2'><span
															className='icon-check_circle mr-2 text-muted'></span><span>{this.state.job.eduexpdetails}</span>
														</li>
													</ul>
												</div>
										
												<div className='mb-5'>
													<h3 className='h5 d-flex align-items-center mb-4 text-primary'><span className='icon-turned_in mr-3'></span>Other Benifits</h3>
													<ul className='list-unstyled m-0 p-0'>
														<li className='d-flex align-items-start mb-2'><span
															className='icon-check_circle mr-2 text-muted'></span><span>{this.state.job.benefits}</span>
														</li>							
													</ul>
												</div>
											</div>
											<div className='col-lg-4'>
												<div className='bg-light p-3 border rounded mb-4'>
												<h3 className='text-primary  mt-3 h5 pl-3 mb-3 '>Job Summary</h3>
												<ul className='list-unstyled pl-3 mb-0'>
													<li className='mb-2'><strong className='text-black'>Published on:</strong> {this.state.job.registeredon}</li>
													<li className='mb-2'><strong className='text-black'>Vacancy:</strong> {this.state.job.vacancy}</li>
													<li className='mb-2'><strong className='text-black'>Employment Status:</strong> {jobTypes.filter(type => parseInt(type.id) === parseInt(this.state.job.jobtype))[0].name}</li>
													<li className='mb-2'><strong className='text-black'>Min Experience:</strong> {this.state.job.minexperience} months</li>
													<li className='mb-2'><strong className='text-black'>Max Experience:</strong> {this.state.job.maxexperience} months</li>
													<li className='mb-2'><strong className='text-black'>Job Location:</strong> {this.state.job.town}, {this.state.job.district}, {this.state.job.state}</li>
													<li className='mb-2'><strong className='text-black'>Salary:</strong> &#x20b9; {this.state.job.salary}</li>
													<li className='mb-2'><strong className='text-black'>Gender:</strong> {gender.filter(gd => parseInt(gd.id) === parseInt(this.state.job.gender))[0].name}</li>
													<li className='mb-2'><strong className='text-black'>Application Deadline:</strong> {this.state.job.closedon}</li>
												</ul>
												</div>			
											</div>
											</div>
										</div>
									</section>
								)
								:
								(
									<NoData tag={
										<p>Job details do not exist, click <Link to='/'>here</Link> to reach <HomeIcon className='no-data-home' style={{ color: green[500], fontSize: 40, verticalAlign: -7 }}/> home.</p>
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
		common: state.common
	}
}

export default connect(mapStateToProps, null)(JobView);