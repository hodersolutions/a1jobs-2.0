import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import JobList from '../job/JobList';
import SearchJobs from './SearchJobs';
import { searchJobs } from '../../store/actions/searchActions';
import { SHOW_LOADING } from '../../store/types/commonTypes';
import ListLoader from '../common/loading/ListLoader';
import NoData from '../common/NoData';

class SearchJobsMain extends Component {    
    componentDidMount() {
        window.scrollTo(0, 0);
        let params = {userid: -1};
        if(this.props.user.logged_user !== null && this.props.user.is_recruiter)
            params.userid = this.props.user.logged_user.id;
        
        this.props.searchJobs(params, {mode: 'cors'});
    }
    
	render() {		
		return (
            <Fragment>
                <div className='search-jobs site-content'>
                    <div className='container'>
                        <div className='row align-items-center justify-content-center underline'>
                            <div className='col-md-12'>
                                <h1 className='font-weight-bold'>Search a Job</h1>                                    
                            </div>
                        </div>
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-md-12'>
                                <SearchJobs />
                            </div>
                        </div>
                    </div>
                    {
					    (this.props.search.status === SHOW_LOADING) ?
					    ( 
                            <ListLoader />
                        )
					    :
					    (                                                        
                            (this.props.search.searchJobs.length) ?                                  
                            <JobList list={this.props.search.searchJobs} />
                            :
                            <NoData tag={
                                <p>No jobs to see here.</p>
                            } />
                        )
                    }
                </div>
            </Fragment>
        )				
    }
}

const mapStateToProps = (state, props) => {
	return {
        user: state.user,
        search: state.search
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
		searchJobs: (searchParams) => dispatch(searchJobs(searchParams))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobsMain);