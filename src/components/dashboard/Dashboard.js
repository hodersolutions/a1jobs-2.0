import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    const style = {
      'margin': '0px 0px 25px 15px' 
    }
    if (this.props.user.is_authenticated)
      	return <Redirect to='/home' />
    else {
		return (      
			<div className="container">            
				<div className="row">
					<div className="col col-centered wrapper">
						<h3 className="border-bottom mb-5 h3 mb-5 font-header">Recent Exams</h3>
						<p style={ style }>No Exams added recently...</p>
					</div>            
				</div>
			</div>
		)
    }
  }
}

const mapStateToProps = (state) => {
	return {
    	module: state.module,
    	user: state.user
	}
}

export default connect(mapStateToProps)(Dashboard);