import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard page by default', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /dashboard/i });
  expect(headingElement).toBeInTheDocument();
});
