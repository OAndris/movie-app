import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Spinner.scss';

interface Props {
    size?: string;
    color?: string;
    margin?: string;
    speedInSec?: number;
    className?: string;
}

const Spinner: React.FC<Props> = ({
    size = '2.5em',
    color = 'gray',
    margin = '1em',
    speedInSec = 2.5,
    className,
}) => {
    return (
        <div
            className={'spinner' + (className ? ` ${className}` : '')}
            style={{ margin }}
        >
            <FaSpinner
                size={size}
                color={color}
                style={{ animation: `spin ${speedInSec}s linear infinite` }}
            />
        </div>
    );
};

export default Spinner;
