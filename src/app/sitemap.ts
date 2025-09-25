import { MetadataRoute } from 'next';
import { DummyJsonApi } from '@/services/dummyJsonApi';
import { ReviewServices } from '@/services/reviewServices';
import { generateBlogSlug } from '@/utils/slugUtils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tphome.vn';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Generate product pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const productsResponse = await DummyJsonApi.getAllProducts(100); // Get up to 100 products for sitemap
    productPages = productsResponse.products.map(product => ({
      url: `${baseUrl}/shop/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating product sitemap:', error);
  }

  // Generate blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await ReviewServices.getReviewsFromPosts(50); // Get up to 50 blogs for sitemap
    blogPages = blogs.map(blog => {
      const slug = generateBlogSlug(blog.content, blog.id);
      return {
        url: `${baseUrl}/blogs/${slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
  }

  return [...staticPages, ...productPages, ...blogPages];
}