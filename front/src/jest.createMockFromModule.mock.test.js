import { render, screen } from '@testing-library/react';
import axios from 'axios';

import usersMock from './usersMock';
import WithCreate from './WithAxiosCreate';
import WithoutCreate from './WithoutAxiosCreate';

describe('jest.createMockFromModule tests', () => {
  beforeAll(() => {
    jest.createMockFromModule('axios');
    // NOTE: jest.mock('axios') also works
  });

  describe('withoutAxiosCreate', () => {
    test('renders correctly', async () => {
      axios.get = jest.fn(async () => ({ data: usersMock }));

      render(<WithoutCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });

  describe('withAxiosCreate', () => {
    test('renders correctly', async () => {
      axios.create = jest.fn(() => ({
        get: () => Promise.resolve({ data: usersMock }),
      }));

      render(<WithCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });
});
