import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmationModal from './index';

describe('ConfirmationModal', () => {
  const message = 'Are you sure you want to delete this item?';
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  const props = {
    message,
    onClose,
    onConfirm,
  };

  it('should not render the modal when isOpen is false', () => {
    render(<ConfirmationModal {...props} isOpen={false} />);

    const modal = screen.queryByText(message);
    expect(modal).not.toBeInTheDocument();
  });

  it('should render the modal when isOpen is true', () => {
    render(<ConfirmationModal {...props} isOpen={true} />);

    const modalMessage = screen.getByText(message);
    expect(modalMessage).toBeInTheDocument();

    const yesButton = screen.getByText('Yes');
    const noButton = screen.getByText('No');
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
  });

  it('should call onConfirm when the "Yes" button is clicked', async () => {
    render(<ConfirmationModal {...props} isOpen={true} />);

    const yesButton = screen.getByText('Yes');
    await userEvent.click(yesButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the "No" button is clicked', async () => {
    render(<ConfirmationModal {...props} isOpen={true} />);

    const noButton = screen.getByText('No');
    await userEvent.click(noButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
