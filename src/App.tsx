import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CustomQueryClient } from './api/CustomQueryClient';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import routes from './pages/routes';

const App = () => (
    <>
        <Header />
        <main id="main">
            <FavoritesProvider>
                <CustomQueryClient devtools={false}>
                    <Routes>
                        {Object.keys(routes).map((route) => (
                            <Route
                                key={route}
                                path={routes[route].path}
                                element={routes[route].element}
                            />
                        ))}
                        <Route path="/*" element={<h2>Page Not Found</h2>} />
                    </Routes>
                </CustomQueryClient>
            </FavoritesProvider>
        </main>
        <Footer />
    </>
);

export default App;
