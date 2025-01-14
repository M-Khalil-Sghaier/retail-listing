import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  describe('Render', () => {
    const onClose = jest.fn();

    it('Should render', async () => {
      render(
        <Modal onClose={onClose} isOpen={true} title="Title">
          Hello World
        </Modal>,
      );
      const modal = await screen.findByTestId('modal');
      expect(modal).toBeInTheDocument();
    });
    it('Should not render', async () => {
      render(
        <Modal title="Title" isOpen={false} onClose={onClose}>
          Hello World
        </Modal>,
      );

      const modal = await waitFor(() => screen.queryByTestId('modal'));

      expect(modal).not.toBeInTheDocument();
    });
  });
});
