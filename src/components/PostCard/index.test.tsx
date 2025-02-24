import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostCard from './index';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('PostCard', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    body: 'This is a test post.',
    userId: 1,
    user: {
      name: 'John Doe',
    },
  };

  it('should render the post card correctly', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    expect(screen.getByText(mockPost.user.name)).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
  });

  it('should open the confirmation modal when the "Delete" button is clicked', () => {
    render(<PostCard post={mockPost} />);

    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);
    const confirmButton = screen.getByText('Confirm');
    const cancelButton = screen.getByText('Cancel');
    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('should call handleDelete when the "Confirm" button is clicked', async () => {
    render(<PostCard post={mockPost} />);

    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);

    const confirmButton = screen.getByText('Confirm');
    userEvent.click(confirmButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/posts/${mockPost.id}`, {
        method: 'DELETE',
      });
    });
  });

  it('should close the modal when the "Cancel" button is clicked', () => {
    render(<PostCard post={mockPost} />);

    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);

    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);

    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});
