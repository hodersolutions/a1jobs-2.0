import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <Fragment>
			<footer className="site-footer banner-gradient-royal-top">	
				<div className="container">
					<div className="row mb-5">
						<div className="col-6 col-md-3 mb-4 mb-md-0">
						<h3>Search Trending</h3>
						<ul className="list-unstyled">
							<li><Link to='/'>Web Design</Link></li>
							<li><Link to='/'>Graphic Design</Link></li>
							<li><Link to='/'>Web Developers</Link></li>
							<li><Link to='/'>Python</Link></li>
							<li><Link to='/'>HTML5</Link></li>
							<li><Link to='/'>CSS3</Link></li>
						</ul>
						</div>
						<div className="col-6 col-md-3 mb-4 mb-md-0">
						<h3>Company</h3>
						<ul className="list-unstyled">
							<li><Link to='/'>About Us</Link></li>
							<li><Link to='/'>Career</Link></li>
							<li><Link to='/'>Blog</Link></li>
							<li><Link to='/'>Resources</Link></li>
						</ul>
						</div>
						<div className="col-6 col-md-3 mb-4 mb-md-0">
						<h3>Support</h3>
						<ul className="list-unstyled">
							<li><Link to='/'>Support</Link></li>
							<li><Link to='/'>Privacy</Link></li>
							<li><Link to='/'>Terms of Service</Link></li>
						</ul>
						</div>
						<div className="col-6 col-md-3 mb-4 mb-md-0">
						<h3>Contact Us</h3>
						<div className="footer-social">
							<Link to='/'><span className="icon-facebook"></span></Link>
							<Link to='/'><span className="icon-twitter"></span></Link>
							<Link to='/'><span className="icon-instagram"></span></Link>
							<Link to='/'><span className="icon-linkedin"></span></Link>
						</div>
						</div>
					</div>
					<div className="row text-center">
						<div className="col-12">
							<p>				
								Copyright &copy; <script>document.write(new Date().getFullYear());</script> 2019 All rights reserved | by <a href="http://www.hoder.in" target="_blank" rel="noopener noreferrer">hoder.in</a>
							</p>
						</div>
					</div>
				</div>
			</footer>
      </Fragment>
    );
  }
}

export default Footer;
