import { RouteInterface } from '../models/models';

interface Routes {
    [key: string]: RouteInterface;
}

const routes: Routes = {
    IndexPage: {
        path: '/',
        title: 'Find Movies',
    },
    FavoritesPage: {
        path: '/favorites',
        title: 'Manage Favorites',
    },
};

export default routes;
