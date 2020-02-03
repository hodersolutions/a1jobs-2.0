import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
	render() {
		const horizontal = { 
		'margin': '0 25%'
		}
		return (
		<Fragment>
				<footer className="site-footer banner-gradient-royal-top">
				<div className="container">
					<ul className="list-unstyled row text-center d-flex justify-content-center pt-5 mb-3">
						<li className="col-md-2 mb-3">
							<a href='http://www.hoder.in/about' target='_blank' rel='noopener noreferrer'>ABOUT US</a>										
						</li>
						<li className="col-md-2 mb-3">
							<a href='http://www.hoder.in/products' target='_blank' rel='noopener noreferrer'>OUR PRODUCTS</a>										
						</li>
						<li className="col-md-2 mb-3">
							<Link to='/contact'>CONTACT</Link>					
						</li>
						</ul>
						<hr className="rgba-white-light" style={horizontal}/>				
						<div className="col-md-12">
							<div className="mb-5 flex-center footer-social">
								<Link to='/'><span className='icon-facebook'></span></Link>
								<Link to='/'><span className='icon-twitter'></span></Link>
								<Link to='/'><span className='icon-instagram'></span></Link>
								<Link to='/'><span className='icon-linkedin'></span></Link>
							</div>
						</div>
						<div className="footer-copyright text-center py-3">
							Copyright &copy; {(new Date().getFullYear())} All rights reserved | by <a href='http://www.hoder.in' target='_blank' rel='noopener noreferrer'>hoder.in</a>
						</div>
					</div>
				</footer>
		</Fragment>
		);
	}
}

export default Footer;
