import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../common/loading/Loading';
import { ModuleCard } from '../module/show/ModuleCard';
import { getModules } from '../../store/actions/moduleActions';
import './UserDashboard.css';
import { GET_MODULES_SUCCESS } from '../../store/types/moduleTypes';

class UserDashboard extends Component {
	constructor(props) {
		super(props);
		this.props.getModules({
			creator_id: this.props.user.current_user.id,
			count: 3
		});
	}
	renderModuleList() {
		if(this.props.common.loading) {
			return (<Loading />);
		} 
		else if (this.props.module.status === GET_MODULES_SUCCESS){
			return (
				this.props.module.modules.map((moduleObj, index) => {
					return (<ModuleCard key={ index } id={ moduleObj.id } module={ moduleObj.module } description={ moduleObj.description } author={ this.props.user.username } />);
				})
			);
		}
		else {
			const exams_style = {
				'margin': '0px 0px 25px 15px' 
			}
			return (<div style={ exams_style }>Unable to retrieve modules...</div>);
		}
  	}
	render() {
		const exams_style = {
			'margin': '0px 0px 25px 15px' 
		}
		const modules_style = {
			'margin': '0px 0px 25px 0px' 
		}
		const image_style = {
			'height': '25px',
    	'marginRight': '5px',
    	'marginBottom': '5px'
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col col-centered wrapper">
						<h3 className="border-bottom mb-5 h3 mb-5 font-header">Recent Modules / Topics</h3>
						<div style={ modules_style }>							
							{this.renderModuleList()}
						</div>
						<Link to="/module" className="nav-item nav-link">                    
						<img
							src={require("../../static/images/add.png")}
							alt="Add Module"					
							style={ image_style }
						/><span className='add-link'>Add Module</span>
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col col-centered wrapper">
						<h3 className="border-bottom mb-5 h3 mb-5 font-header">Recent Exams</h3>
						<p style={ exams_style }>No Exams added recently...</p>
						<Link to="/exam" className="nav-item nav-link">                    
							<img
								src={require("../../static/images/add.png")}
								alt="Add Exam"					
								className='image-style'
							/><span className='add-link'>Add Exam</span>
                        </Link>
					</div>            
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
    	module: state.module,
		user: state.user,
		common: state.common
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
      getModules: (params) => dispatch(getModules(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);