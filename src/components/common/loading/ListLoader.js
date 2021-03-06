import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const ListLoader = () => (
    <Fragment>
        <section key='1'>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-12'>
                        <div className='job-loading'>
                            <ContentLoader height={160} width={400} speed={2} primaryColor='#D4EFDF' secondaryColor='#D5F5E3'>                                
                                <rect x='0' y='10' rx='1' ry='1' width='400' height='10' /> 
                                <rect x='50' y='30' rx='1' ry='1' width='300' height='10' /> 
                                <rect x='0' y='50' rx='1' ry='1' width='400' height='10' />
                                <rect x='50' y='70' rx='1' ry='1' width='300' height='10' />  
                                <rect x='0' y='90' rx='1' ry='1' width='400' height='10' />
                                <rect x='50' y='110' rx='1' ry='1' width='300' height='10' /> 
                                <rect x='0' y='130' rx='1' ry='1' width='400' height='10' />
                                <rect x='50' y='150' rx='1' ry='1' width='300' height='10' />  
                                <rect x='0' y='170' rx='1' ry='1' width='400' height='10' />
                            </ContentLoader>                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
)

export default ListLoader
