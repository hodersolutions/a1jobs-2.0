import React, { Component } from 'react';
import Banner from '../common/Banner';

export default class JobCreate extends Component {
    constructor(props) {
		super(props);
		this.state = {
			title: '', 
			type: '', 
			location: '',
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
			deadline: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		return (
			<div>
				<Banner banner="Post a Job" />
				<div className="job-create-section" id="next-section">
					<form action="#" className="">
						<div className="container">
							<div className="row">						
								<div className="col-12">
									<label className="text-black" htmlFor="fname">Job title</label>
									<input type="text" id="title" name="title" className="form-control" value={this.state.title} onChange={this.handleChange}/>
								</div>								
								<div className="col-12">
									<label className="text-black" htmlFor="lname">Last Name</label>
									<input type="text" id="lname" className="form-control" />
								</div>
								<div className="col-12">
									<label className="text-black" htmlFor="email">Email</label>
									<input type="email" id="email" className="form-control" />
								</div>			                    
								<div className="col-12">
									<label className="text-black" htmlFor="subject">Subject</label>
									<input type="subject" id="subject" className="form-control" />
								</div>
								<div className="col-12">
									<label className="text-black" htmlFor="message">Message</label>
									<textarea name="message" id="message" cols="30" rows="7" className="form-control"
										placeholder="Write your notes or questions here..."></textarea>
								</div>				
								<div className="col-12">
									<input type="submit" value="Send Message" className="btn btn-primary btn-md text-white" />
								</div>
							</div>
						</div>							                
					</form>						
				</div>
			</div>
		)
	}
}
