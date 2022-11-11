import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import usersMock from './usersMock';
import WithCreate from './WithAxiosCreate';
import WithoutCreate from './WithoutAxiosCreate';

describe('msw lib tests', () => {
  const server = setupServer(
    rest.get('http://localhost:3001/users/', (_req, res, ctx) => {
      return res(ctx.delay(10), ctx.status(200), ctx.json(usersMock));
    }),
  );

  beforeAll(() => server.listen());

  afterAll(() => server.close());

  describe('withoutAxiosCreate', () => {
    test('renders correctly', async () => {
      render(<WithoutCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });

  describe('withAxiosCreate', () => {
    test('renders correctly', async () => {
      render(<WithCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });
});
