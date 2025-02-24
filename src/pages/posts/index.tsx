import { PrismaClient } from '@prisma/client';
import PostCard from '@/components/PostCard';
import '@/app/globals.css';
import { useState } from 'react';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    include: { user: true },
  });
  return { props: { posts } };
}

import { Post } from '@prisma/client';

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className='text-xl font-semibold text-gray-900 -mt-1'>Posts</h1>

      <div className="pt-2 relative mx-auto text-gray-600 m-4">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
