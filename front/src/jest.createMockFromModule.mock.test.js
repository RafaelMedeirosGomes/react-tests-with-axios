import { render, screen } from '@testing-library/react';
import axios from 'axios';
import WithCreate from './WithAxiosCreate';
import WithoutCreate from './WithoutAxiosCreate';

const usersMock = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: '--adm2@21!!--',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: 'fulana@123',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '$#zebirita#$',
    role: 'customer',
  },
];

describe('jest.createMockFromModule tests', () => {
  beforeAll(() => {
    jest.createMockFromModule('axios');
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
