import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import routes from '../../pages/routes';
import { Route } from '../../models/models';
import RouteLink from '../RouteLink/RouteLink';

const RouteItem: React.FC<Route> = ({ path, title }) => {
    const isActive = path === useLocation().pathname;
    return (
        <li className="route-item">
            <RouteLink
                to={path}
                color="white"
                className={'link' + (isActive ? ' active' : '')}
            >
                {title}
            </RouteLink>
        </li>
    );
};

const Header = () => {
    const routeItems = Object.keys(routes).map((route) => {
        const { path, title } = routes[route];
        return <RouteItem key={path} path={path} title={title} />;
    });
    return (
        <header id="header">
            <div className="width-container">
                <h1 className="title">
                    <RouteLink to={routes.IndexPage.path} color="white">
                        The Movie App
                    </RouteLink>
                </h1>
                <nav id="route-nav">
                    <ul className="route-list">{routeItems}</ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
