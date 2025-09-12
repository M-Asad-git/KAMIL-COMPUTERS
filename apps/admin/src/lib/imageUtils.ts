// Utility to get the full image URL
export const getImageUrl = (imagePath: string): string => {
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path starting with /uploads, prefix with API URL
  if (imagePath.startsWith('/uploads/')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const baseUrl = apiUrl.replace('/api', ''); // Remove /api suffix
    return `${baseUrl}${imagePath}`;
  }
  
  // For other cases, return as is
  return imagePath;
};