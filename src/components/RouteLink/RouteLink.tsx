import React from 'react';
import { Link } from 'react-router-dom';
import './RouteLink.scss';

interface Props {
    to: string;
    color?: string;
    className?: string;
    children: React.ReactElement | string;
}

const RouteLink: React.FC<Props> = ({ to, color, className, children }) => (
    <Link
        to={to}
        style={color ? { color } : null}
        className={'route-link' + (className ? ` ${className}` : '')}
    >
        {children}
    </Link>
);

export default RouteLink;
