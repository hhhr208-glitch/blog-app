
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
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { deletePost } from "./delete";
import { ReadableStreamBYOBRequest } from "node:stream/web";
import { LikeButton } from "@/components/features/clientLikeButton";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "public" | "private";
}


export default function Show({ id, title, content, imageUrl, edit , authorImage , authorName , createdAt }: BlogPost & { edit: boolean }){
  return (
    <Card className="group h-full flex flex-col border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white ml-4 mr-4 ">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow pb-4">
<Image 
  src={imageUrl}      
  width={500}
  height={300}
  alt="Image description"
/>
        <div className="text-gray-600 leading-relaxed line-clamp-3">
          {content}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Image 
              src={authorImage} 
              alt={authorName}
              width={44}
              height={44}
              className="rounded-full border-2 border-white shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm">
              {authorName}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
        
       <Link href={`/post/${id}`}>
  <Button 
    
    size="sm" 
   className="bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-all duration-300 rounded-xl font-semibold shadow-sm"
  >
    View 
  </Button>
</Link>
        {edit && (
    <Link href={`/edit/${id}`}>
          <Button 
             size="sm" 
     className="bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-all duration-300 rounded-xl font-semibold shadow-sm"
          >
            edit
          </Button>
          
        </Link>
        
)}


   {!edit && (
    
    <LikeButton postId={id}></LikeButton>
        
)}
  
{edit && (
    <form action={deletePost} >
  <input type="hidden" name="postId" value={id} />
  <Button  size="sm" 
     className="bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-all duration-300 rounded-xl font-semibold shadow-sm" type="submit">delete</Button>
</form>
        
)}
      </CardFooter>

    </Card>
  );
}