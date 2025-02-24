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

  const mockOnPostDeleted = jest.fn(); // Mock callback function

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the post card correctly', () => {
    render(<PostCard post={mockPost} onPostDeleted={mockOnPostDeleted} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    expect(screen.getByText(mockPost.user.name)).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
  });

  it('should open the confirmation modal when the "Delete" button is clicked', async () => {
    render(<PostCard post={mockPost} onPostDeleted={mockOnPostDeleted} />);

    const deleteButton = screen.getByText('Delete');
    await userEvent.click(deleteButton);

    expect(
      screen.getByText('Are you sure you want to delete this post?')
    ).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('should call handleDelete and onPostDeleted when "Confirm" button is clicked', async () => {
    render(<PostCard post={mockPost} onPostDeleted={mockOnPostDeleted} />);

    const deleteButton = screen.getByText('Delete');
    await userEvent.click(deleteButton);

    const confirmButton = screen.getByText('Yes');
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/posts/${mockPost.id}`, {
        method: 'DELETE',
      });
      expect(mockOnPostDeleted).toHaveBeenCalledWith(mockPost.id); // Ensure callback is called
    });
  });

  it('should handle API failure and display an error message', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Failed to delete post' }),
      })
    );

    render(<PostCard post={mockPost} onPostDeleted={mockOnPostDeleted} />);

    const deleteButton = screen.getByText('Delete');
    await userEvent.click(deleteButton);

    const confirmButton = screen.getByText('Yes');
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to delete post')).toBeInTheDocument();
    });

    expect(mockOnPostDeleted).not.toHaveBeenCalled();
  });

  it('should close the modal when the "Cancel" button is clicked', async () => {
    render(<PostCard post={mockPost} onPostDeleted={mockOnPostDeleted} />);

    const deleteButton = screen.getByText('Delete');
    await userEvent.click(deleteButton);

    const cancelButton = screen.getByText('No');
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Are you sure you want to delete this post?')
      ).not.toBeInTheDocument();
    });
  });
});
