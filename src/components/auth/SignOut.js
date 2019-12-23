import React, { Component } from 'react'
import {connect} from 'react-redux';
import {signOutUser} from '../../store/actions/userActions';
import {Redirect} from 'react-router-dom';

class SignOut extends Component {
    constructor(props) {
        super(props);
        this.props.signOutUser()
    }
    render() {
        return (
            <Redirect to='/' />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOutUser: () => dispatch(signOutUser())
    }
}


export default connect(null, mapDispatchToProps)(SignOut);