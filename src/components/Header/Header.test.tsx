import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

beforeEach(() => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
});

test('renders 2 routes for navigation', () => {
    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(2);
});
