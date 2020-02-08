import React, { Component } from 'react';
import Random from '../common/Helper';
import { Link } from 'react-router-dom';

class Home extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		var imgUrl = require('../../static/images/welcome/welcome_'+ Random() +'.jpg');

		const style = {
			'backgroundImage': 'url('+ imgUrl +')'
		}
		const hidden = {
			'display': 'none'
		}
		return (			
			<div className='home-section section-hero overlay bg-image' style={style} id='home-section'>
				<div className='container'>
					<div className='row align-items-center justify-content-center'>
					<div className='col-md-12'>
						<div className='mb-5 text-center'>						
							<h1 className='text-white font-weight-bold welcome-message'>Your friendly neighbourhood career assistant @ school.</h1>
							<p>Find your dream jobs on our portal.</p>
							<h2 className='text-white font-weight-bold'>Start exploring <Link to='/jobs' className='start-exploring'>here.<span className="blinking-cursor">|</span></Link></h2>
							<div style={hidden}>{React.version}</div>							
						</div>
						{/* SearchJobs component was here */}
					</div>
					</div>
				</div>
			</div>			
		)
	}
}

export default Home;
