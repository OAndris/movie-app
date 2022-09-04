import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import routes from './pages/routes';
import IndexPage from './pages/IndexPage/IndexPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './contexts/FavoritesContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => {
    return (
        <>
            <Header />
            <main id="main">
                <FavoritesProvider>
                    <QueryClientProvider client={queryClient}>
                        <Routes>
                            <Route
                                path={routes.IndexPage.path}
                                element={<IndexPage />}
                            />
                            <Route
                                path={routes.FavoritesPage.path}
                                element={<FavoritesPage />}
                            />
                            <Route
                                path="/*"
                                element={<h2>Page Not Found</h2>}
                            />
                        </Routes>
                    </QueryClientProvider>
                </FavoritesProvider>
            </main>
            <Footer />
        </>
    );
};

export default App;
