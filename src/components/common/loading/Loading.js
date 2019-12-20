import React, { Component, Fragment } from 'react';
import Banner from "../../common/Banner";

class Loading extends Component {
    render() {        
        return (
            <Fragment>
                <Banner banner="" />
                <div className="d-flex justify-content-center">
                    <img src={require("../../../static/images/loading/loading-hourglass.gif")} alt="Loading" />
                </div>
            </Fragment>            
        );
    }
}

export default Loading;