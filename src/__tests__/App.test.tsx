import { render, screen } from '@testing-library/react';
import App from '../App';

test('App starts up', async () => {
    render(<App />);
    expect(screen.getByText(/Reack and Morquery/)).toBeInTheDocument();
});