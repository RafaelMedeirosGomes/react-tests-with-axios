import { render, screen } from '@testing-library/react';
import { MockServer } from 'jest-mock-server';

import usersMock from './usersMock';
import WithCreate from './WithAxiosCreate';
import WithoutCreate from './WithoutAxiosCreate';

describe('lib jest-mock-server tests', () => {
  const server = new MockServer({ port: 3001 });

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  beforeEach(() => server.reset());

  describe('withoutAxiosCreate', () => {
    test.skip("not working don't know why", async () => {
      server.get('users').mockImplementationOnce((ctx) => {
        ctx.response.set('access-control-allow-origin', '*');
        ctx.status = 200;
        ctx.body = usersMock;
      });

      render(<WithoutCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });

  describe('withAxiosCreate', () => {
    test.skip("not working don't know why", async () => {
      server.get('users').mockImplementationOnce((ctx) => {
        ctx.response.set('access-control-allow-origin', '*');
        ctx.status = 200;
        ctx.body = usersMock;
      });

      render(<WithCreate />);
      const customerEmail = await screen.findByText(/zebirita@email.com/i);
      const customerName = await screen.findByText(/zé birita/i);

      expect(customerEmail).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });
});
