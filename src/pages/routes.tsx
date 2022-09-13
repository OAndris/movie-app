import { RouteInterface } from '../interfaces/interfaces';
import IndexPage from './IndexPage/IndexPage';
import FavoritesPage from './FavoritesPage/FavoritesPage';

interface Routes {
    [key: string]: RouteInterface;
}

const routes: Routes = {
    IndexPage: {
        path: '/',
        element: <IndexPage />,
        title: 'Find Movies',
    },
    FavoritesPage: {
        path: '/favorites',
        element: <FavoritesPage />,
        title: 'Manage Favorites',
    },
};

export default routes;
