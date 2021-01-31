import { render, screen } from '@testing-library/react';
import App from './App';

test('App properly renders title', () => {
  render(<App />);
  const title = screen.getByText(/Rewards/i);
  expect(title).toBeInTheDocument();
});
