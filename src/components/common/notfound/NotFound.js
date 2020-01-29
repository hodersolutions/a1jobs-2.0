import React, { Component } from 'react';

class NotFound extends Component {
    componentDidMount() {
		window.scrollTo(0, 0);
    }
    
    render() {
        return (
            <div className='not-found site-content'>
                <div className='notfound'>
                    <div className='notfound-404'>                            
                        <h1><span>4</span><span>0</span><span>4</span></h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                </div>
            </div>            
        );
    }
}

export default NotFound;