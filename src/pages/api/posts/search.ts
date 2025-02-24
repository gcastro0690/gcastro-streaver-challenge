import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/posts/search:
 *   get:
 *     summary: Query posts by title or body
 *     tags:
 *       - Posts
 *     description: Returns posts that match the search query in either the title or body
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query
 *     responses:
 *       200:
 *         description: Successful search response
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const query = req.query.q as string;
      const posts = await prisma.post.findMany({
        where: {
          OR: [{ title: { contains: query } }, { body: { contains: query } }],
        },
      });
      res.status(200).json(posts);
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
