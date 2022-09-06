import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toggleElementInNumericArray } from '../utils/utils';

const FavoritesContext = createContext(null);

interface ProviderProps {
    children: React.ReactElement;
}

export const FavoritesProvider: React.FC<ProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useLocalStorage('favorites', []);
    const toggleIsFavorite = (id: number) => {
        setFavorites(() => toggleElementInNumericArray(favorites, id));
    };
    return (
        <FavoritesContext.Provider value={{ favorites, toggleIsFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};
