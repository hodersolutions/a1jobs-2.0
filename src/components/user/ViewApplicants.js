import React, { Component, Fragment } from 'react';
import { notify } from 'react-notify-toast';
import DetailsLoader from '../common/loading/DetailsLoader';
import { connect } from 'react-redux';
import UserAPI from '../../api/UserAPI';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green } from '@material-ui/core/colors';
import NoData from '../common/NoData';

class ViewApplicants extends Component {
	constructor(props) {
        super(props);
        this.api = null;
		this.state = {
			applicants: [],
			loading: false
		}
	}

    async componentDidMount() {
		window.scrollTo(0, 0);
		if(this.props.user !== null && this.props.user.logged_user !== null) {
            this.api = new UserAPI();
            this.setState({
                loading: true
            });
            await this.api.getAppliedUsers({ requisitionid: this.props.match.params.id})
            .then(response => {				
                if (response.status === 'success') {
                    this.setState({
                        applicants: response.users,
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
	}
	
	render() {
        return (
			<Fragment>
				<div className='site-content'>	
					{
						(this.state.loading) ?
						( <DetailsLoader /> )
						:
						(
							[
								(this.props.user.logged_user !== null) ?
								(
									[
										this.state.applicants.length > 0 ?
										(
											<section key='3'>
												<div className='container'>
													<div className='row align-items-center justify-content-center un-underline'>
														<div className='col-md-12'>
															<div className='no-data'>
															{
																this.state.applicants.map((applicant, index) => {                    
																	return (
																		<div key={ index + 1 }>
																			{ applicant.email }                            
																		</div>
																	);
																})
															}
															</div>
														</div>
													</div>
												</div>
											</section>
										)
										:
										(
											<NoData tag={
												<p>No applications.</p>
											} />
										)
									]									
								)
								:
								(
									<NoData tag={
										<p>Please login <Link to='/signin'>here</Link> <ExitToAppIcon className='no-data-home' style={{ color: green[500], fontSize: 40, verticalAlign: -7 }}/> as a recruiter to view these details.</p>
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
	}
}

export default connect(mapStateToProps, null)(ViewApplicants);
