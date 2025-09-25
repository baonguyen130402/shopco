import { DummyJsonApi } from './dummyJsonApi';
import { transformPostsToReviews, PostWithUser } from '@/utils/postToReviewTransformer';
import { Review } from '@/types/review.types';

export class ReviewServices {
  static async getReviewsFromPosts(limit = 10, skip = 0): Promise<Review[]> {
    try {
      // Fetch posts
      const postsResponse = await DummyJsonApi.getAllPosts(limit, skip);
      
      // Fetch users for each post
      const postsWithUsers: PostWithUser[] = await Promise.all(
        postsResponse.posts.map(async (post) => {
          try {
            const user = await DummyJsonApi.getUserById(post.userId);
            return { ...post, user };
          } catch (error) {
            console.error(`Error fetching user ${post.userId}:`, error);
            // Fallback user if API fails
            return {
              ...post,
              user: {
                id: post.userId,
                firstName: 'Anonymous',
                lastName: 'User',
                username: `user${post.userId}`,
                email: `user${post.userId}@example.com`,
                image: '',
              },
            };
          }
        })
      );

      // Transform to reviews
      return transformPostsToReviews(postsWithUsers);
    } catch (error) {
      console.error('Error fetching reviews from posts:', error);
      throw error;
    }
  }

  static async getRandomReviews(count = 6): Promise<Review[]> {
    try {
      // Fetch more posts than needed to have variety
      const limit = Math.max(count * 2, 20);
      const reviews = await this.getReviewsFromPosts(limit);
      
      // Shuffle and return the requested count
      const shuffled = reviews.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } catch (error) {
      console.error('Error fetching random reviews:', error);
      throw error;
    }
  }
}