import React from 'react';
import './Compass.css';

const Compass = ({ direction }) => {
    const needleStyle = {
        transform: `rotate(${direction}deg)`
    };

    return (
        <div className="compass">
            <div className="compass-needle" style={needleStyle}></div>
        </div>
    );
};

export default Compass;
