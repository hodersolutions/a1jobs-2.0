import React, { Component, Fragment } from 'react';

class Loading extends Component {
    render() {        
        return (
            <Fragment>
                <div className="d-flex justify-content-center">
                    <img src={require("../../../static/images/loading/loading-hourglass.gif")} alt="Loading" />
                </div>
            </Fragment>            
        );
    }
}

export default Loading;