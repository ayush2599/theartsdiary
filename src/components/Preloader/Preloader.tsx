import React, { FC } from 'react';
import './Preloader.css';

interface PreloaderProps {}

const Preloader: FC<PreloaderProps> = () => (
  <div className="preloader">
      <div className="spinner"></div>
    </div>
);

export default Preloader;
