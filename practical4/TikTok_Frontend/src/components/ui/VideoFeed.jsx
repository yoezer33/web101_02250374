'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { fetchVideos } from '@/services/videoService';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function VideoFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver(handleLoadMore);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-white text-xl">Loading videos...</p>
    </div>
  );

  if (isError) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-xl">Failed to load videos.</p>
    </div>
  );

  const videos = data?.pages.flatMap(page => page.videos) ?? [];

  return (
    <div className="flex flex-col items-center bg-black min-h-screen py-4">
      {videos.length === 0 && (
        <p className="text-white mt-10">No videos found.</p>
      )}

      {videos.map((video) => (
        <div
          key={video.id}
          className="w-full max-w-md bg-gray-900 rounded-xl mb-6 overflow-hidden shadow-lg"
        >
          <video
            src={video.url}
            controls
            className="w-full h-96 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              {video.user?.avatar && (
                <img
                  src={video.user.avatar}
                  alt={video.user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <span className="text-white font-semibold">
                @{video.user?.username}
              </span>
            </div>
            <p className="text-gray-300 text-sm">{video.title}</p>
            {video.description && (
              <p className="text-gray-500 text-xs mt-1">{video.description}</p>
            )}
          </div>
        </div>
      ))}

      {/* Sentinel — triggers next page load */}
      <div ref={sentinelRef} className="h-10 w-full" />

      {isFetchingNextPage && (
        <p className="text-white text-sm mb-4">Loading more videos...</p>
      )}

      {!hasNextPage && videos.length > 0 && (
        <p className="text-gray-500 text-sm mb-4">You've reached the end!</p>
      )}
    </div>
  );
}


