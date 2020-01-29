import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import ProfileList from '../user/ProfileList';
import UserAPI from '../../api/UserAPI';
import ListLoader from '../common/loading/ListLoader';

class SearchProfiles extends Component {
    constructor() {
        super();
        this.api = new UserAPI();
        this.state = {
            users: [],
            loading: false
        }
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        let params = {userid: -1};
        if(this.props.user.logged_user !== null && this.props.user.logged_user.is_recruiter) {
            params.userid = this.props.user.logged_user.id;
            this.setState({                
                loading: true
            });
            await this.api.getUserProfileByFilter(params, {mode: 'cors'})
            .then(response => {            
                if (response.status === 'success') {
                    this.setState({
                        users: response.users,
                        loading: false
                    });
                }
                else {
                    notify.show(response.message, 'error', 5000, 'red');
                    this.setState({						
                        loading: false,
                        users: []
                    });
                }
            });
        }
    }
    
	render() {
		return (
            <Fragment>
                <div className='search-jobs site-content'>
                    <div className='container'>
                        <div className='row align-items-center justify-content-center underline'>
                            <div className='col-md-12'>
                                <h1 className='font-weight-bold'>Search a Profile</h1>                                    
                            </div>
                        </div>
                        <div className='row align-items-center justify-content-center'>
                        <div className='col-md-12'>
                            {/* SearchProfiles component */}
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
                            (this.state.users.length) ?                                  
                                <ProfileList list={this.state.users}/>
                            :
                            <section key='3'>
                                <div className='container'>
                                    <div className='row align-items-center justify-content-center un-underline'>
                                        <div className='col-md-12'>
                                            <div className='no-data'>
                                                <h1 className='font-weight-bold'>
                                                    No profiles to see here.
                                                </h1>
                                            </div>                        
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

export default connect(mapStateToProps, null)(SearchProfiles);