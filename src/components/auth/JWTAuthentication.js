import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateToken } from '../../store/actions/userActions';
import JWT from '../../components/common/JWT';
import Loading from '../common/loading/Loading';

export default function requireAuth(ProtectedComponent)  {
    class JWTAuthenticate extends Component {
        constructor(props) {
            super(props);
            const jwt = JWT.get_jwt();            
            if (this.props.user.logged_user === null) {
                this.props.common.loading = true;
                if (jwt['access_token'] !== null && jwt['mobile'] !== null)
                    this.props.validateToken({
                        access_token: jwt['access_token'],
                        mobile: jwt['mobile']                        
                    });
                else if (this.props.user.access_token !== null && this.props.user.mobile !== null)
                    this.props.validateToken({
                        access_token: this.props.user.access_token,
                        mobile: this.props.user.mobile                     
                    });
                else
                    this.props.history.push('signin');
            }
        }
        render() {
            if (this.props.user.logged_user !== null) {
                return (
                    <ProtectedComponent {...this.props} />
                )
            }
            else if (this.props.common.loading === true) {
                return (
                    <Loading />
                )
            }
            else {                
                return (
                    <Redirect to='/signin' />
                )
            }
        }
    }    

    const mapStateToProps = (state) => {
        return {
            user: state.user,
            common: state.common
        }
    };
    
    const mapDispatchToProps = (dispatch) => {
        return {
            validateToken: (auth) => dispatch(validateToken(auth))
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(JWTAuthenticate);
}