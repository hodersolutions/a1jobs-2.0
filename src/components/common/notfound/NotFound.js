import React, { Component } from 'react';

class NotFound extends Component {
    componentDidMount() {
		window.scrollTo(0, 0);
    }
    
    render() {
        return (
            <div>
                <div className="site-section not-found">
                    <div className="notfound">
                        <div className="notfound-404">                            
                            <h1><span>4</span><span>0</span><span>4</span></h1>
                        </div>
                        <h2>we are sorry, but the page you requested was not found</h2>
                    </div>
                </div>
            </div>            
        );
    }
}

export default NotFound;