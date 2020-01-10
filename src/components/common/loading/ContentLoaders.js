import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const FbLoader = () => (
    <Fragment>
        <ContentLoader height={160} width={400} speed={2} primaryColor='#f3f3f3' secondaryColor='#ecebeb'>
            <rect x='70' y='15' rx='4' ry='4' width='117' height='6' /> 
            <rect x='70' y='35' rx='3' ry='3' width='85' height='6' /> 
            <rect x='0' y='80' rx='3' ry='3' width='350' height='6' /> 
            <rect x='0' y='100' rx='3' ry='3' width='380' height='6' /> 
            <rect x='0' y='120' rx='3' ry='3' width='201' height='6' /> 
            <circle cx='30' cy='30' r='30' />
        </ContentLoader>
        <ContentLoader height={130} width={400}>
            <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
            <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
            <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
            <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
            <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
            <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
        </ContentLoader>
  </Fragment>
)

export default FbLoader