import { apiClient } from './api';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiClient.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/upload/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiClient.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload images');
    }

    const data = await response.json();
    return data.urls;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload images');
  }
};