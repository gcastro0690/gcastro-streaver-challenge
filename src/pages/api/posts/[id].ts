import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const postId = parseInt(req.query.id as string);
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error' });
      }
    }
  } else if (req.method === 'DELETE') {
    const postId = parseInt(req.query.id as string);
    try {
      const post = await prisma.post.delete({
        where: { id: postId },
      });
      res.status(200).json({ message: 'Removed post', post });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Not permitted' });
  }
}
