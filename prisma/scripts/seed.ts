import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function seed() {
  const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
  const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');

  for (const user of usersResponse.data) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  for (const post of postsResponse.data) {
    await prisma.post.create({
      data: {
        title: post.title,
        body: post.body,
        userId: post.userId,
      },
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });