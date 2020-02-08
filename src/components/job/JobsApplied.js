import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import JobList from '../job/JobList';
import ListLoader from '../common/loading/ListLoader';
import JobAPI from '../../api/JobAPI';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green } from '@material-ui/core/colors';
import NoData from '../common/NoData';

class JobsApplied extends Component {
    constructor(props) {
        super(props);
        this.api = null;
        this.state = {
            jobs: [],
            loading: false
        }
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.user.logged_user !== null){
            if (!this.props.user.logged_user.is_recruiter) {
                this.api = new JobAPI();
                this.setState({
                    loading: true
                });
                await this.api.getAppliedJobs(this.props.user.logged_user.id, {mode: 'cors'})
                .then(response => {
                    if (response.status === 'success') {
                        this.setState({
                            jobs: response.requisition,
                            loading: false
                        });
                    }
                    else {
                        notify.show(response.message, 'error', 5000, 'red');
                        this.setState({
                            loading: false,
                            jobs: []
                        });
                    }
                });	
            }
        }
    }
    
	render() {
		return (
            <Fragment>
                <div className='site-content'>
                    <div className='container'>
                        <div className='row align-items-center justify-content-center underline'>
                            <div className='col-md-12'>
                                <h1 className='font-weight-bold'>My Applied Jobs</h1>                                    
                            </div>
                        </div>                        
                    </div>	
                    {
                        (this.state.loading) ?
                        ( <ListLoader /> )
                        :
                        (
                            [
                                (this.props.user.logged_user !== null) ?
                                (
                                    (
                                        (this.state.jobs.length > 0) ? 
                                        (
                                            <JobList list={this.state.jobs} />

                                        )
                                        :
                                        (
                                            <section key='3'>
                                                <div className='container'>
                                                    <div className='row align-items-center justify-content-center un-underline'>
                                                        <div className='col-md-12'>
                                                            <div className='no-data'>
                                                                <h1 className='font-weight-bold'>
                                                                    No jobs applied.
                                                                </h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>        
                                        )
                                    )                                								
                                )
                                :
                                (
                                    <NoData tag={<div>
                                        Please login <Link to='/signin'>here</Link> <ExitToAppIcon className='no-data-home' style={{ color: green[500], fontSize: 40, verticalAlign: -7 }}/> to view these details.
                                    </div>} />
                                )
                            ]
                        )
                    }
			    </div>
            </Fragment>            
        )				
    }
}

const mapStateToProps = (state, props) => {
	return {
        user: state.user
	}
};

export default connect(mapStateToProps, null)(JobsApplied);