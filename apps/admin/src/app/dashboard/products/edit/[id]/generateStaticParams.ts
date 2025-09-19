// This file handles static generation for the dynamic route
export async function generateStaticParams() {
  // For GitHub Pages, we'll generate a fallback page
  // The actual routing will be handled client-side
  return [];
}

export const dynamicParams = true;