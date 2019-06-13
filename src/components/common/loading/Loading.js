import React, { Component } from 'react';

class Loading extends Component {
    render() {        
        return (
            <div className="d-flex justify-content-center">
                <img src={require("../../../static/images/loading-hourglass.gif")} alt="Loading" />
            </div>
        );
    }
}

export default Loading;