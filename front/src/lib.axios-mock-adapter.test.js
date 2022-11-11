import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import usersMock from './usersMock';
import WithCreate from './WithAxiosCreate';
import WithoutCreate from './WithoutAxiosCreate';

describe('axios-mock-adapter lib tests', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('withoutAxiosCreate', () => {
    test('renders correctly', async () => {
      mock.onGet('http://localhost:3001/users/').reply(200, usersMock);

      render(<WithoutCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });

  describe('withAxiosCreate', () => {
    test('renders correctly', async () => {
      mock.onGet('http://localhost:3001/users/').reply(200, usersMock);

      render(<WithCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });
});
