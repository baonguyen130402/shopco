import { notFound } from "next/navigation";
import { ReviewServices } from "@/services/reviewServices";
import { DummyJsonApi } from "@/services/dummyJsonApi";
import ReviewCard from "@/components/common/ReviewCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react";
import { Review } from "@/types/review.types";
import Breadcrumb from "@/components/common/Breadcrumb";
import { extractUserIdFromSlug, generateBlogSlug } from "@/utils/slugUtils";
import { Metadata } from "next";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: "Blog không tìm thấy - TPHOME",
      description: "Trang blog bạn đang tìm kiếm không tồn tại.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${blog.content.slice(1, 50)}... - Blog TPHOME`;
  const description = `${blog.content.slice(1, 150)}... Đọc thêm các bài viết về gạch ốp lát, trang trí nội thất tại TPHOME.`;
  
  return {
    title,
    description,
    keywords: [
      "blog gạch ốp lát",
      "kinh nghiệm trang trí",
      "nội thất",
      "thiết bị vệ sinh",
      "tư vấn xây dựng",
      "TPHOME blog",
      "gạch trang trí",
      "chia sẻ kinh nghiệm",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      url: `https://tphome.vn/blogs/${params.slug}`,
      siteName: "TPHOME",
      title,
      description,
      images: [
        {
          url: "/images/blog-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Blog TPHOME - ${blog.user}`,
        },
      ],
      publishedTime: blog.date,
      authors: [blog.user],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/blog-og-image.jpg"],
    },
    alternates: {
      canonical: `https://tphome.vn/blogs/${params.slug}`,
    },
    category: "Blog",
  };
}

async function getBlogBySlug(slug: string): Promise<Review | null> {
  try {
    const userId = extractUserIdFromSlug(slug);
    if (!userId) return null;

    // Get all reviews and find the one with matching user ID in slug
    const reviews = await ReviewServices.getReviewsFromPosts(100);
    const review = reviews.find(r => {
      // Since we're using posts API, we need to find by some identifier
      // We'll use the user ID pattern from the slug
      return r.id === userId;
    });
    
    return review || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

async function getRelatedBlogs(currentId: number): Promise<Review[]> {
  try {
    const blogs = await ReviewServices.getRandomReviews(3);
    return blogs.filter(r => r.id !== currentId);
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return [];
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-frame mx-auto px-4 xl:px-0 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-frame mx-auto px-4 xl:px-0 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: "Blogs", href: "/#reviews" },
              { label: `Blog by ${blog.user}` }
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Blog Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[20px] p-8 shadow-sm">
              <ReviewCard 
                data={blog} 
                isDate 
                isClickable={false}
                className="border-none shadow-none p-0 bg-transparent"
              />
              
              {/* Extended Content */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-4">Blog Details</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {blog.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-gray-100">
                  <Button variant="outline" className="flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Helpful ({Math.floor(Math.random() * 50) + 10})
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-[20px] p-8 shadow-sm mt-6">
              <h3 className="text-xl font-bold mb-6">Comments</h3>
              <div className="space-y-6">
                {/* Sample Comments */}
                {[1, 2].map((index) => (
                  <div key={index} className="flex space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">User {index}</span>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700">
                        This is a sample comment on the review. Thanks for sharing your experience!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Comment */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <textarea 
                  className="w-full p-4 border border-gray-200 rounded-lg resize-none"
                  rows={3}
                  placeholder="Add a comment..."
                />
                <Button className="mt-3">Post Comment</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] p-6 shadow-sm sticky top-8">
              <h3 className="text-lg font-bold mb-4">Related Blogs</h3>
              <div className="space-y-4">
                {relatedBlogs.map((relatedBlog) => {
                  const blogSlug = generateBlogSlug(relatedBlog.content, relatedBlog.id);
                  return (
                  <Link key={relatedBlog.id} href={`/blogs/${blogSlug}`}>
                    <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer my-2">
                      <div className="flex items-center mb-2">
                        <span className="font-semibold text-sm">{relatedBlog.user}</span>
                        <div className="ml-auto flex">
                          {Array.from({ length: relatedBlog.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedBlog.content.substring(0, 100)}...
                      </p>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
