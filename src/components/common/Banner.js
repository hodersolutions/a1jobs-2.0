import React, { Component } from 'react';

class Banner extends Component {      
    render() {          
        return (
            <div>
                <div className="home-section section-hero inner-page overlay bg-image banner-gradient-royal" id="home-section">
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