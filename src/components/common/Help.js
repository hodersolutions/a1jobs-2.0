import React, { Component } from 'react';

class Help extends Component {    
    render() {
        const style = {
            paddingTop: '3rem'
        }
        return (
        <div>
            <div className='container' style = { style }>
                <div className='row align-items-center justify-content-center underline'>
                    <div className='col-md-12'>
                        <h1 className='font-weight-bold'>Help</h1>                                    
                    </div>
                </div>
                <div className='col-md mx-auto content-about'>            
                <div className='row-about row-about-height'>
                    <div>
                    • Application version: 1.0.0.0
                    </div>
                </div>
                <div className='row-about row-about-height'>
                    <div>
                    • Powered by Hoder Solution Pvt Ltd.
                    </div>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default About;