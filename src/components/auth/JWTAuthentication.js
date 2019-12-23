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
            const jwt = JWT.get_jwt()
            if (!this.props.user.is_authenticated) {
                this.props.user.loading = true;
                if (jwt['token'] !== null && jwt['username'] !== null)
                    this.props.validateToken({
                        token: jwt['token'],
                        username: jwt['username']                        
                    });
                else if (this.props.user.token !== null && this.props.user.username !== null)
                    this.props.validateToken({
                        token: this.props.user.token,
                        username: this.props.user.username                     
                    });
                else
                    this.props.history.push('signin');
            }            
        }
        render() {
            if (this.props.user.is_authenticated === true) {
                return (
                    <ProtectedComponent {...this.props} />
                )
            }
            else if (this.props.user.loading === true) {
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
            user: state.user
        }
    };
    
    const mapDispatchToProps = (dispatch) => {
        return {
            validateToken: (auth) => dispatch(validateToken(auth))
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(JWTAuthenticate);
}