import React, { Component } from 'react';
import Random from './Helper';

class Banner extends Component {    
    render() {        
        var imgUrl = require('../../static/images/welcome/welcome_'+ Random() +'.jpg');

	    const style = {
		    'backgroundImage': 'url('+ imgUrl +')'
	    }
        return (
            <div>
                <div className="home-section section-hero inner-page overlay bg-image" style={style} id="home-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                    <div className="col-md-12">
                        <div className="mb-5 text-center stay-close">
                            <h1 className="text-white font-weight-bold">{ this.props.banner }</h1>                            
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Banner;