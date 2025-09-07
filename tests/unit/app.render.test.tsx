import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import App from '../../src/App';

describe('App shell', () => {
  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText(/Project Initiator/i)).toBeDefined();
  });
});

