import { updatePost } from "@/app/actions/updateAction";
import { prisma } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link';

export default async function EditPage({ params }: { params: { id: string } }) {
  const postId = params.id; 
  const data = await prisma.blogPost.findUnique({
    where: { id: postId }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <form action={updatePost}>
          <input type="hidden" name="id" value={data?.id} />
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-6 space-y-3 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-100/50">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                Edit Post
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Update your post content and image
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 p-8">
              {/* Title Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Post Title
                </label>
                <Input 
                  name="title" 
                  defaultValue={data?.title} 
                  className="w-full h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                  placeholder="Enter post title..."
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Post Content
                </label>
                <Textarea 
                  name="content" 
                  defaultValue={data?.content} 
                  className="w-full min-h-[200px] text-base border-2 border-gray-200 focus:border-green-500 rounded-xl resize-vertical transition-all duration-200"
                  placeholder="Write your post content..."
                />
              </div>

              {/* Image URL Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Image URL
                </label>
                <Input 
                  name="imageUrl" 
                  defaultValue={data?.imageUrl} 
                  className="w-full h-12 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                />
                
                {/* Image Preview */}
                {data?.imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Current Image Preview:</p>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
                     <img 
  src={data.imageUrl} 
  alt="Current post image" 
  className="w-full h-48 object-contain" // ← Change to object-contain
/>
                    </div>
                  </div>
                )}
              </div>

              
            </CardContent>
            
            <CardFooter className="">
              <Link href="/">
                <Button 
                  type="button" 
                  variant="outline" 
                  className=""
                >
                  Cancel
                </Button>
              </Link>
              
              <Button 
                type="submit" 
                className=""
              >
                Update Post
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}