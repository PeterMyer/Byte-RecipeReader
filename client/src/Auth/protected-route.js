import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import  {Loading}  from './Loading';

export default function ProtectedRoute ({ component }) {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
          <div className="page-layout">
            <Loading />
          </div>
        ),
      });
    
      return <Component/> ;
    };