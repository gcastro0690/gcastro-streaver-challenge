import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import Image from 'next/image';
import { Post } from '@prisma/client';

export default function PostCard({ post, onPostDeleted }: { post: Post, onPostDeleted: (postId: number) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to delete post');
      }
      setIsModalOpen(false);
      onPostDeleted(post.id);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex bg-white shadow-lg rounded-lg mb-4">
      <div className="flex items-start px-4 py-6">
        <Image
          className="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src={'/fallback-user.png'}
          alt="avatar"
          width={48}
          height={48}
        />
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {
                //@ts-expect-error Property user exists.
                post.user.name
              }
            </h2>
          </div>
          <h2>{post.title}</h2>
          <p className="mt-3 text-gray-700 text-sm">{post.body}</p>

          <button
            className={`bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mt-4 cursor-pointer ${
              isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setIsModalOpen(true)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this post?"
      />
    </div>
  );
}
