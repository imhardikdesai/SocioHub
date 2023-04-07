import React from 'react';
import { Helmet } from 'react-helmet';

function MyHelmet({ userDetails }) {

    return (
        <Helmet>
            <title>{`${userDetails ? userDetails.username + ' - SocioHub' : 'loading'} `}</title>
            <meta name="description" content={`${userDetails ? userDetails.bio : 'loading'}`} />
            <meta property="og:title" content={`${userDetails ? userDetails.username + ' - SocioHub' : 'loading'} `} />
            <meta property="og:description" content={`${userDetails ? userDetails.bio : 'loading'}`} />
            <meta property="og:image" content={`${userDetails ? userDetails.profileImage : 'loading'}`} />
            <meta property="og:image" content={userDetails && userDetails.profileImage} />
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />
            <meta property="og:image:alt" content={`${userDetails && userDetails.username} profile image`} />
            <meta property="og:type" content="profile" />
            <meta property="og:url" content={userDetails && userDetails.profileImage} />
            <meta property="twitter:title" content={`${userDetails && userDetails.username} - SocioHub`} />
            <meta property="twitter:description" content={`${userDetails && userDetails.bio}`} />
            <meta property="twitter:image" content={userDetails && userDetails.profileImage} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={userDetails && userDetails.profileImage} />
            <meta property="twitter:site" content={`${userDetails && '@' + userDetails.username}`} />
            <meta property="twitter:creator" content={`${userDetails && '@' + userDetails.username}`} />
            <meta property="whatsapp:title" content={`${userDetails && userDetails.username} - SocioHub`} />
            <meta property="whatsapp:description" content={`${userDetails && userDetails.bio}`} />
            <meta property="whatsapp:image" content={userDetails && userDetails.profileImage} />
        </Helmet>
    );
}

export default MyHelmet;
