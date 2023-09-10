import {render, screen} from '@testing-library/react';
import AboutPage from  '../pages/AboutPage'
import React from 'react';
test('renders the About Page with a heading', () => {
    const { getByText } = render(<AboutPage />);
    const heading = getByText('About Page');
    expect(heading).toBeInTheDocument();
  });