import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import JobList from '../job/JobList';
import JobAPI from '../../api/JobAPI';
import ListLoader from '../common/loading/ListLoader';

class JobPostings extends Component {
    constructor() {
        super();
        this.api = new JobAPI();
        this.state = {
            jobs: [],
            loading: true
        }
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        let params = {userid: -1};
        if(this.props.user.logged_user !== null)
            params.userid = this.props.user.logged_user.id;
        
        await this.api.getJobs(params, {mode: 'cors'})
        .then(response => {            
            if (response.status === 'success') {                
                this.setState({
                    jobs: response.jobs,
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
    
	render() {
		return (
            <Fragment>
                <div className='search-jobs site-content'>
                    <div className='container'>
                        <div className='row align-items-center justify-content-center underline'>
                            <div className='col-md-12'>
                                <h1 className='font-weight-bold'>My Posts</h1>                                    
                            </div>
                        </div>                        
                    </div>
                    {
					    (this.state.loading) ?
					    ( 
                            <ListLoader />
                        )
					    :
					    (                            
                            (this.state.jobs.length) ?                                  
                                <JobList list={this.state.jobs} />
                            :
                            <section key='3'>
                                <div className='container'>
                                    <div className='row align-items-center justify-content-center un-underline'>
                                        <div className='col-md-12'>                                            
                                            <h1 className='font-weight-bold'>
                                                No jobs to see here.
                                            </h1>                                            
                                        </div>
                                    </div>
                                </div>
                            </section>
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

export default connect(mapStateToProps, null)(JobPostings);