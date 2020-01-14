import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const FbLoader = () => (
    <Fragment> 
        <ContentLoader height={60} width={400} speed={2} primaryColor='#D4EFDF' secondaryColor='#D5F5E3'>
            <rect x='70' y='10' rx='1' ry='1' width='300' height='6' /> 
            <rect x='70' y='25' rx='1' ry='1' width='220' height='4' /> 
            <rect x='70' y='35' rx='1' ry='1' width='180' height='4' />
            <rect x='70' y='45' rx='1' ry='1' width='220' height='4' />  
            <circle cx='30' cy='30' r='25' />
        </ContentLoader>
        <ContentLoader height={80} width={400} speed={2} primaryColor='#D4EFDF' secondaryColor='#D5F5E3'>
            <circle cx='25' cy='20' r='6' />
            <rect x='35' y='15' rx='1' ry='1' width='300' height='4' />
            <rect x='35' y='30' rx='1' ry='1' width='220' height='4' />
            <rect x='35' y='45' rx='1' ry='1' width='170' height='4' />
            <rect x='35' y='60' rx='1' ry='1' width='220' height='4' />
            <rect x='35' y='75' rx='1' ry='1' width='170' height='4' />      
        </ContentLoader>
        <ContentLoader height={80} width={400} speed={2} primaryColor='#D4EFDF' secondaryColor='#D5F5E3'>
            <circle cx='25' cy='20' r='6' />
            <rect x='35' y='15' rx='1' ry='1' width='300' height='4' />
            <rect x='35' y='30' rx='1' ry='1' width='220' height='4' />
            <rect x='35' y='45' rx='1' ry='1' width='170' height='4' />
            <rect x='35' y='60' rx='1' ry='1' width='220' height='4' />
            <rect x='35' y='75' rx='1' ry='1' width='170' height='4' />
        </ContentLoader>
  </Fragment>
)

export default FbLoader