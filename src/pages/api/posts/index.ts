import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Fetch all posts
 *     tags:
 *       - Posts
 *     description: Retrieves a list of all posts
 *     responses:
 *       200:
 *         description: Successful response
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     description: Adds a new post to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post created successfully
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error' });
      }
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, userId } = req.body;

      if (!title || !content || !userId) {
        return res.status(400).json({ message: 'Required parameters' });
      }

      const post = await prisma.post.create({
        data: { title, body: content, userId },
      });
      res.status(201).json(post);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error' });
      }
    }
  }

  else {
    res.status(405).json({ message: 'Not permitted' });
  }
}
