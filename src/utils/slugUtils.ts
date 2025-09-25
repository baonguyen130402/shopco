export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function generateBlogSlug(content: string, userId: number): string {
  // Extract first few words from content to create a meaningful slug
  const words = content
    .replace(/[""]/g, '') // Remove quotes
    .split(' ')
    .slice(0, 6) // Take first 6 words
    .join(' ');
  
  return generateSlug(words) + `-${userId}`;
}

export function extractUserIdFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}