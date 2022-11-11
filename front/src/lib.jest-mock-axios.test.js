import { render, screen } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

import usersMock from './usersMock';
import WithCreate from './WithAxiosCreate';
import WithoutCreate from './WithoutAxiosCreate';

describe('jest-mock-axios lib tests', () => {
  beforeAll(() => {
    jest.mock('axios', () => mockAxios);
  });

  describe('withoutAxiosCreate', () => {
    test.skip("not working, don't know why", async () => {
      render(<WithoutCreate />);
      mockAxios.mockResponseFor({ method: 'get', data: usersMock });
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });

  describe('withAxiosCreate', () => {
    test.skip("not working, don't know why", async () => {
      render(<WithCreate />);
      mockAxios.mockResponseFor({ method: 'get', data: usersMock });
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });
});
