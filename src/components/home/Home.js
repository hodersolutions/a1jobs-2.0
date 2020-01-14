import React, { Component } from 'react';
import Random from '../common/Helper';
import SearchJobs from '../search/SearchJobs';

class Home extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		}
	render() {
		var imgUrl = require('../../static/images/welcome/welcome_'+ Random() +'.jpg');

		const style = {
			'backgroundImage': 'url('+ imgUrl +')'
		}
		return (
			<div>
				<div className='home-section section-hero overlay bg-image' style={style} id='home-section'>
					<div className='container'>
						<div className='row align-items-center justify-content-center'>
						<div className='col-md-12'>
							<div className='mb-5 text-center'>						
							<h1 className='text-white font-weight-bold'>A Powerful Website for Careers @ School</h1>
							<p>Find your dream jobs in our portal.</p>
							</div>
							<SearchJobs />
						</div>
						</div>
					</div>
				</div>			
			</div>
		)
	}
}

export default Home;