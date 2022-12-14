import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import Popcorn from '../../assets/popcorn.svg';
import routes from '../../pages/routes';
import { RouteLinkInterface } from '../../interfaces/interfaces';
import RouteLink from '../RouteLink/RouteLink';
import Image from '../Image/Image';

const RouteItem: React.FC<RouteLinkInterface> = ({ path, title }) => {
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
                <div className="logo">
                    <Image src={Popcorn} alt="popcorn" className="image" />
                    <h1 className="title">
                        <RouteLink to={routes.IndexPage.path} color="white">
                            The Movie App
                        </RouteLink>
                    </h1>
                </div>
                <nav id="route-nav">
                    <ul className="route-list">{routeItems}</ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
