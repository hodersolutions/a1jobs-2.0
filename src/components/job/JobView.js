import React, { Component, Fragment } from 'react';
import Loading from '../common/loading/Loading';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getJob, showLoading } from '../../store/actions/jobActions';
import { GET_JOB_SUCCESS, JOB_SHOW_LOADING } from '../../store/types/jobTypes';

class JobView extends Component {	
    constructor(props) {
		super(props);
		this.props.showLoading();
	}

	componentDidMount() {
		this.props.getJob({id: this.props.match.params.id});
	}

	render() {
		const justify = {textAlign: "justify"}
		const padding = {paddingRight: "10px"}
		const titlePadding = {paddingLeft: "10px"}		
		if(this.props.job.status === JOB_SHOW_LOADING) {
			return (<Loading />);
		} 
		else if (this.props.job.status === GET_JOB_SUCCESS){			
			return (
				<Fragment>
					<section className="site-section">
						<div className="container">
							<div className="row align-items-center justify-content-center underline">
                                <div className="col-md-12">
                                    <h1 className="font-weight-bold">Job details</h1>                                    
                                </div>
                            </div>
							<div className="row align-items-center mb-5">
							<div className="col-lg-8 mb-4 mb-lg-0">
								<div className="d-flex align-items-center">
								<div className="border p-2 d-inline-block mr-3 rounded">
									{/* Get school logo Dynamic */}
									<img className="mb-3" src={require("../../static/images/school.png")} alt="Login" width="100" height="100"/>
								</div>
								<div>
									<h2 style={titlePadding}>{this.props.job.current_job.title}</h2>
									<div className="container">
										<div className="row">
											<div className="col-12">
												<span className="icon-briefcase" style={padding}></span>{this.props.job.current_job.organization}								
											</div>
										</div>
										<div className="row">
											<div className="col-12">
												<span className="icon-room" style={padding}></span>{this.props.job.current_job.location}
											</div>
										</div>
										<div className="row">
											<div className="col-12">
												<span className="icon-clock-o" style={padding}></span><span>{this.props.job.current_job.type}</span>
											</div>
										</div>
									</div>
								</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="row">
								<div className="col-6">
									<Link to="#" className="btn btn-block btn-light btn-md"><span className="icon-heart-o text-danger"></span>Save
									Job</Link>
								</div>
								<div className="col-6">
									<Link to="#" className="btn btn-block btn-primary btn-md">Apply Now</Link>
								</div>
								</div>
							</div>
							</div>
							<div className="row">
							<div className="col-lg-8">
								<div className="mb-5">							
								<h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-align-left mr-3"></span>Job
									Description</h3>
								<div style = { justify }>
									{this.props.job.current_job.description}
								</div>								
								</div>
								<div className="mb-5">
								<h3 className="h5 d-flex align-items-center mb-4 text-primary"><span
									className="icon-rocket mr-3"></span>Responsibilities</h3>
								<ul className="list-unstyled m-0 p-0">
									<li className="d-flex align-items-start mb-2"><span
										className="icon-check_circle text-muted"></span><span>{this.props.job.current_job.responsibilities}</span></li>
								</ul>
								</div>
						
								<div className="mb-5">
								<h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-book mr-3"></span>Education +
									Experience</h3>
								<ul className="list-unstyled m-0 p-0">
									<li className="d-flex align-items-start mb-2"><span
										className="icon-check_circle text-muted"></span><span>{this.props.job.current_job.edu_exp_details}</span></li>									
								</ul>
								</div>
						
								<div className="mb-5">
								<h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-turned_in mr-3"></span>Other
									Benifits</h3>
								<ul className="list-unstyled m-0 p-0">
									<li className="d-flex align-items-start mb-2"><span
										className="icon-check_circle text-muted"></span><span>{this.props.job.current_job.benefits}</span></li>									
								</ul>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="bg-light p-3 border rounded mb-4">
								<h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">Job Summary</h3>
								<ul className="list-unstyled pl-3 mb-0">
									<li className="mb-2"><strong className="text-black">Published on:</strong> {this.props.job.current_job.publish_date}</li>
									<li className="mb-2"><strong className="text-black">Vacancy:</strong> {this.props.job.current_job.vacancy}</li>
									<li className="mb-2"><strong className="text-black">Employment Status:</strong> {this.props.job.current_job.type}</li>
									<li className="mb-2"><strong className="text-black">Experience:</strong> {this.props.job.current_job.experience}</li>
									<li className="mb-2"><strong className="text-black">Job Location:</strong> {this.props.job.current_job.location}</li>
									<li className="mb-2"><strong className="text-black">Salary:</strong> &#x20b9; {this.props.job.current_job.salary}</li>
									<li className="mb-2"><strong className="text-black">Gender:</strong> {this.props.job.current_job.gender}</li>
									<li className="mb-2"><strong className="text-black">Application Deadline:</strong> {this.props.job.current_job.deadline}</li>
								</ul>
								</div>			
							</div>
							</div>
						</div>
					</section>
				</Fragment>
			);
		}
		else {
			const exams_style = {
				'margin': '0px 0px 25px 15px' 
			}
			return (<div style={ exams_style }>Unable to retrieve Job details...</div>);
		} 
    }
}

const mapStateToProps = (state) => {
	return {
    	job: state.job,
        user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		getJob: (params) => dispatch(getJob(params)),
		showLoading: () => dispatch(showLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobView);