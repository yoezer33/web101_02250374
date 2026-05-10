import apiClient from '../lib/axios';

export const createVideo = async (videoFile, thumbnailFile, caption) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('caption', caption);
  if (thumbnailFile) {
    formData.append('thumbnail', thumbnailFile);
  }

  const response = await apiClient.post('/videos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};