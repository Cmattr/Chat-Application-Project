import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders HomePage correctly', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Looking for "Sign in to open Chat" header text
  const signInHeader = screen.getByText(/sign in to open chat/i);
  expect(signInHeader).toBeInTheDocument();
});
