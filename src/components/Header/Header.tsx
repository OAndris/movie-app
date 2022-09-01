import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import routes from '../../pages/routes';
import { Route } from '../../models/models';

const RouteItem: React.FC<Route> = ({ path, title }) => {
    const isActive = path === useLocation().pathname;
    return (
        <li className="route-item">
            <Link
                to={path}
                className={'route-link' + (isActive ? ' active' : '')}
            >
                {title}
            </Link>
        </li>
    );
};

const Header = () => {
    const routeLinks = Object.keys(routes).map((route) => {
        const { path, title } = routes[route];
        return <RouteItem key={path} path={path} title={title} />;
    });
    return (
        <header id="header">
            <h1 className="title">The Movie App</h1>
            <nav id="route-nav">
                <ul className="route-list">{routeLinks}</ul>
            </nav>
        </header>
    );
};

export default Header;
