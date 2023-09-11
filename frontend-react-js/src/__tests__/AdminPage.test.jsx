import {render} from '@testing-library/react';
import AdminPage from '../pages/AdminPage';
import React from 'react';
it('renders the Admin Page with a heading', () => {
    const {getByTitle} = render(<AdminPage />);
    const heading = getByTitle('level 4');
    expect(heading).toBeInTheDocument();
});