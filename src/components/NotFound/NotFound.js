import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='notFound-container'>
      <h1 className='notFound-title'>404 - Not Found</h1>
      <p className='notFound-message'>The page you are looking for might have been removed or is temporarily unavailable.</p>
    </div>
  );
}

export default NotFound;
