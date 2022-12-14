import './Footer.scss';
import TmdbLogo from '../../assets/tmdb-logo.svg';
import ManPopcorn from '../../assets/man-popcorn.svg';
import WomanPopcorn from '../../assets/woman-popcorn.svg';
import routes from '../../pages/routes';
import RouteLink from '../RouteLink/RouteLink';
import Image from '../Image/Image';

const Footer = () => (
    <footer id="footer">
        <div className="width-container">
            <RouteLink to={routes.IndexPage.path}>
                <div className="tma-container">
                    <p className="title">The Movie App</p>
                    <div className="images">
                        <Image
                            src={ManPopcorn}
                            alt="Man with popcorn and 3D glasses"
                            className="image"
                        />
                        <Image
                            src={WomanPopcorn}
                            alt="Woman with popcorn and 3D glasses"
                            className="image"
                        />
                    </div>
                </div>
            </RouteLink>
            <div className="internal-links">
                {Object.keys(routes).map((route) => (
                    <RouteLink
                        key={route}
                        to={routes[route].path}
                        color="black"
                    >
                        {routes[route].title}
                    </RouteLink>
                ))}
            </div>
            <div className="tmdb-container">
                <p>Powered by:</p>
                <a href="https://www.themoviedb.org/">
                    <Image
                        src={TmdbLogo}
                        alt="Logo of the movie data provider (TheMovieDb.org)."
                        className="tmdb-logo"
                    />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
