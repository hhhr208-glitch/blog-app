import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '../../utils/db';
import { createComment } from "@/app/actions/createComment";
import { Textarea } from "@/components/ui/textarea";
import { getName } from "@/components/features/getUserName";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  
  const comments = await prisma.comment.findMany({
    where: {
      postId: params.id
    },
    orderBy: {
      createdAt: 'desc' 
    }
  });

  try {
    console.log('Fetching post with ID:', params.id);
    
    const post = await prisma.blogPost.findUnique({
      where: {
        id: params.id
      },
    });

    

    if (!post) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
          <Card className="max-w-md w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-lg text-gray-700 mb-4 font-medium">Post not found</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-6 space-y-3 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-100/50">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight">
                {post.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 font-medium">
                Posted by <span className="text-blue-600 font-semibold">{post.authorName}</span>
              </CardDescription>
            </CardHeader>
            
            {post.imageUrl && (
              <div className="px-8 py-8">
                <div className="flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image 
                      src={post.imageUrl}      
                      width={800}
                      height={500}
                      alt="Post image"
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
                  </div>
                </div>
              </div>
            )}
            
            <CardContent className="space-y-8 px-8 py-8">
              <div className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap font-light bg-white/50 p-8 rounded-2xl shadow-sm border border-gray-100">
                {post.content}
              </div>

              { /*commets are here*/ }
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  
                  <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                      <p className="text-gray-800 text-lg mb-3 leading-relaxed">{comment.content}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium text-blue-400"> {getName(comment.userId)}</span>
                        <span>•</span>
                        <span>{new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </div>
                  ))}
                  
                  {comments.length === 0 && (
                    <div className="text-center py-12 bg-white/50 rounded-2xl border border-gray-100">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💬</span>
                      </div>
                      <p className="text-gray-600 text-lg">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>

                {/* Add Comment Form */}
                <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="">+</span>
                    Add a Comment
                  </h3>
                  <form action={createComment} className="space-y-4">
                    <input type="hidden" name="postId" value={post.id} />
                    <Textarea 
                      required 
                      name="content" 
                      placeholder="Share your thoughts..."
                      className="min-h-[120px] text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl resize-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                    <Button 
                      size="lg" 
                      type="submit" 
                    
                    >
                      Post Comment
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center py-6 px-8 bg-gradient-to-r from-gray-50 to-blue-50/50 border-t border-gray-100/50">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900 text-lg">{post.authorName}</div>
                  <div className="text-sm text-gray-600 font-medium">
                    {new Date(post.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              
              <Link href="/">
                <Button 
                  variant="outline" 
                  className=""
                >
                  ← Back to Posts
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-lg text-red-600 mb-2 font-semibold">Error loading post</p>
            <p className="text-gray-600 mb-6">{(error as Error).message}</p>
            <Link href="/">
              <Button>
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
}