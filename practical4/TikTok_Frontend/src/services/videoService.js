import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchVideos = async ({ pageParam = undefined }) => {
  const params = { limit: 10 };
  if (pageParam) params.cursor = pageParam;

  const response = await axios.get(`${API_URL}/videos`, { params });
  return response.data;
};

export const fetchFollowingVideos = async ({ pageParam = undefined, userId }) => {
  const params = { limit: 10, userId };
  if (pageParam) params.cursor = pageParam;

  const response = await axios.get(`${API_URL}/videos/following`, { params });
  return response.data;
};