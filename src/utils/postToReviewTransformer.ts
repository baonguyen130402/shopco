import { DummyPost, DummyUser } from '@/types/post.types';
import { Review } from '@/types/review.types';

export interface PostWithUser extends DummyPost {
  user: DummyUser;
}

export const transformPostToReview = (post: PostWithUser): Review => {
  // Generate a rating based on reactions and views
  const totalReactions = post.reactions.likes + post.reactions.dislikes;
  const likeRatio = totalReactions > 0 ? post.reactions.likes / totalReactions : 0.5;
  const viewBonus = Math.min(post.views / 1000, 1); // Max 1 bonus point for high views
  const rating = Math.max(1, Math.min(5, Math.floor((likeRatio * 4 + viewBonus) + 1)));

  // Generate a random date within the last 6 months
  const randomDays = Math.floor(Math.random() * 180);
  const date = new Date();
  date.setDate(date.getDate() - randomDays);
  
  return {
    id: post.id,
    user: `${post.user.firstName} ${post.user.lastName.charAt(0)}.`,
    content: `"${post.body}"`,
    rating: rating,
    date: date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
  };
};

export const transformPostsToReviews = (postsWithUsers: PostWithUser[]): Review[] => {
  return postsWithUsers.map(transformPostToReview);
};