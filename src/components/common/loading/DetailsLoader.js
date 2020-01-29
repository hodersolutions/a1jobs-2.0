import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const DetailsLoader = () => (
    <Fragment>
        <section key='1'>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-12'>
                        <div className='job-loading'>
                            <ContentLoader height={60} width={400} speed={2} primaryColor='#D4EFDF' secondaryColor='#D5F5E3'>
                                <rect x='10' y='10' rx='3' ry='3' width='50' height='40'  />
                                <rect x='70' y='10' rx='1' ry='1' width='300' height='6' /> 
                                <rect x='70' y='25' rx='1' ry='1' width='220' height='4' /> 
                                <rect x='70' y='35' rx='1' ry='1' width='180' height='4' />
                                <rect x='70' y='45' rx='1' ry='1' width='220' height='4' />  
                            </ContentLoader>
                            <ContentLoader height={80} width={400} speed={2} primaryColor='#D4EFDF' secondaryColor='#D5F5E3'>
                                <rect x='10' y='15' rx='3' ry='3' width='15' height='15'  />
                                <rect x='35' y='15' rx='1' ry='1' width='300' height='4' />
                                <rect x='35' y='30' rx='1' ry='1' width='220' height='4' />
                                <rect x='35' y='45' rx='1' ry='1' width='170' height='4' />
                                <rect x='35' y='60' rx='1' ry='1' width='220' height='4' />
                                <rect x='35' y='75' rx='1' ry='1' width='170' height='4' />      
                            </ContentLoader>
                            <ContentLoader height={80} width={400} speed={2} primaryColor='#D4EFDF' secondaryColor='#D5F5E3'>
                                <rect x='10' y='15' rx='3' ry='3' width='15' height='15'  />
                                <rect x='35' y='15' rx='1' ry='1' width='300' height='4' />
                                <rect x='35' y='30' rx='1' ry='1' width='220' height='4' />
                                <rect x='35' y='45' rx='1' ry='1' width='170' height='4' />
                                <rect x='35' y='60' rx='1' ry='1' width='220' height='4' />
                                <rect x='35' y='75' rx='1' ry='1' width='170' height='4' />
                            </ContentLoader>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
)

export default DetailsLoader