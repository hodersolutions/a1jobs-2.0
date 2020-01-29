import React from 'react';

const NoData = ({ tag }) => (
    <section key='3'>
        <div className='container'>
            <div className='row align-items-center justify-content-center'>
                <div className='col-md-12'>
                    <div className='no-data'>
                        <h1 className='font-weight-bold'>
                            { tag }
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </section>    
)

export default NoData;