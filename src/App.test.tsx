import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Help: https://testing-library.com/docs/queries/about/

beforeEach(() => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
});

// NOTE: optionally, below test can be moved to Header.test.tsx, where the H1 element is actually defined
test('renders H1 element with correct text', () => {
    const h1Element = screen.getByRole('heading', { name: /The Movie App/i });
    expect(h1Element.tagName).toEqual('H1');
});

test('renders search box', () => {
    const searchBox = screen.getByRole('searchbox');
    expect(searchBox).toBeInTheDocument();
});
