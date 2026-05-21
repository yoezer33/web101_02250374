const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllVideos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : undefined;

    const videos = await prisma.video.findMany({
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        }
      }
    });

    const hasNextPage = videos.length > limit;
    if (hasNextPage) videos.pop();
    const nextCursor = hasNextPage ? videos[videos.length - 1].id : null;

    res.json({ videos, nextCursor, hasNextPage });

  } catch (error) {
    console.error('getAllVideos error:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

exports.getFollowingVideos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : undefined;
    const userId = parseInt(req.query.userId);

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true }
    });

    const followingIds = following.map(f => f.followingId);

    if (followingIds.length === 0) {
      return res.json({ videos: [], nextCursor: null, hasNextPage: false });
    }

    const videos = await prisma.video.findMany({
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      where: { userId: { in: followingIds } },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        }
      }
    });

    const hasNextPage = videos.length > limit;
    if (hasNextPage) videos.pop();
    const nextCursor = hasNextPage ? videos[videos.length - 1].id : null;

    res.json({ videos, nextCursor, hasNextPage });

  } catch (error) {
    console.error('getFollowingVideos error:', error);
    res.status(500).json({ error: 'Failed to fetch following videos' });
  }
};