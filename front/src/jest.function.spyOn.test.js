import { render, screen } from '@testing-library/react';
import axios from 'axios';
import usersMock from './usersMock';
import WithCreate from './WithAxiosCreate';
import WithoutCreate from './WithoutAxiosCreate';

describe('jest.spyOn tests', () => {
  describe('withoutAxiosCreate', () => {
    test('renders correctly', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: usersMock });

      render(<WithoutCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });

  describe.skip('withAxiosCreate', () => {
    test("doesn't work because axios.create is in a closure", async () => {
      axios.create();
      jest.spyOn(axios, 'create').mockImplementation({
        get: () => Promise.resolve({ data: usersMock }),
      });

      render(<WithCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });
});
