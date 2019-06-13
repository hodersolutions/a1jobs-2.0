import React, { Component } from 'react';
import Random from '../common/Helper';

class Home extends Component {
  render() {
	var imgUrl = require('../../static/images/welcome/welcome_'+ Random() +'.jpg');

	const style = {
		'backgroundImage': 'url('+ imgUrl +')'
	}
    return (
    	<div>
			<div className="home-section section-hero overlay bg-image" style={style} id="home-section">
				<div className="container">
					<div className="row align-items-center justify-content-center">
					<div className="col-md-12">
						<div className="mb-5 text-center">
						<h1 className="text-white font-weight-bold">A Powerful Website for Careers @ School</h1>
						<p>Find your dream jobs in our portal.</p>
						</div>
						<form method="post" className="search-jobs-form">
							<div className="row mb-5">
								<div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
									<input type="text" className="form-control form-control-lg" placeholder="Job title, keywords..."/>
								</div>
								<div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
									<select className="form-control">
										<option>Anywhere</option>
										<option>San Francisco</option>
										<option>Palo Alto</option>
										<option>New York</option>
										<option>Manhattan</option>
										<option>Ontario</option>
										<option>Toronto</option>
										<option>Kansas</option>
										<option>Mountain View</option>
									</select>
								</div>
								<div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
									<select className="form-control">
										<option>Part Time</option>
										<option>Full Time</option>
										<option>Freelancer</option>
									</select>
								</div>
								<div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
									<button type="submit" className="btn btn-primary btn-lg btn-block text-white btn-search"><span className="icon-search icon mr-2"></span>Search Job</button>
								</div>
							</div>
						</form>
					</div>
					</div>
				</div>
		  	</div>
	  	</div>
    )
  }
}

export default Home;