import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

it('Render not found', async () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/404 - Not Found/i);
  expect(linkElement).toBeInTheDocument();
});
