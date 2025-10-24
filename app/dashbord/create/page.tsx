import { handlesubmit } from "@/app/action";
import { SubmitButton } from "@/app/component/submitButton";
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

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Share Your thoughts
        </h1>
        <p className="text-gray-600 text-lg">Create amazing content and inspire the world! 🌟</p>
      </div>

      {/* Card Container */}
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Create New Post
            </CardTitle>
            <CardDescription className="text-gray-500 text-base">
              Share your thoughts, ideas, and creativity with the world! 🚀
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-6">
            <form action={handlesubmit} className="space-y-6">
              {/* Title Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Post Title
                </label>
                <Input 
                  name="title" 
                  required 
                  type="text" 
                  placeholder="Enter an engaging title..." 
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 rounded-xl"
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Your Content
                </label>
                <Textarea 
                  name="content" 
                  required 
                  placeholder="Share your amazing story, ideas, or thoughts..." 
                  className="min-h-[120px] text-base border-2 border-gray-200 focus:border-green-500 transition-all duration-200 rounded-xl resize-vertical"
                />
              </div>

              {/* Image URL Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Image URL
                </label>
                <Input 
                  name="url" 
                  required 
                  type="url" 
                  placeholder="https://example.com/your-image.jpg" 
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-all duration-200 rounded-xl"
                />
               
              </div>

              {/* Submit Button - Fixed */}
              <div className="pt-4">
                <div >
                  <SubmitButton />
                </div>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="border-t border-gray-100 pt-4">
            <p className="text-center text-sm text-gray-500 w-full">
              Your post will be visible to everyone. Make it awesome! ✨
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full blur-xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-30"></div>
    </div>
  );
}