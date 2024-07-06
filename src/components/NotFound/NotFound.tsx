import React, { FC } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
