import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Home from '../src/Pages/Home';

describe('Home component', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        title: 'Mock Photo Title',
        explanation: 'Mock Photo Explanation',
        url: 'https://mockurl.com/photo.jpg',
      }),
    }).mockResolvedValueOnce({
      ok: true,
      url: 'https://mockurl.com/earth.jpg',
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('renders loading spinner initially', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders photo data and earth imagery correctly', async () => {
    const { getByText, getByAltText } = render(<Home />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(getByText('Photo of the day')).toBeInTheDocument();
      expect(getByText('Mock Photo Title')).toBeInTheDocument();
      expect(getByText('Mock Photo Explanation')).toBeInTheDocument();
      expect(getByAltText('Mock Photo Title')).toBeInTheDocument();
      expect(getByText('Earth Imagery')).toBeInTheDocument();
      expect(getByAltText('Earth Imagery')).toBeInTheDocument();
    });
  });

  it('renders error message if data fetching fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch data'));
    const { getByText } = render(<Home />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getByText('Error: Failed to fetch data')).toBeInTheDocument();
    });
  });
});
