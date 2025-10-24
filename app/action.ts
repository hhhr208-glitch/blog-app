

"use server"; 
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from 'next/navigation'

export async function handlesubmit(formdata: FormData) {
   const {getUser} = getKindeServerSession()
   const user = await getUser()
   if (!user){
    redirect('/api/auth/register')
   }
    const title = formdata.get('title')
    const content = formdata.get('content')
    const url = formdata.get('url')
  const data = await prisma.blogPost.create({
  data: {
    title: title as string,
    content: content as string, 
    imageUrl: url as string || "/default.jpg",
    authorId: user!.id, // Use non-null assertion since we checked user exists
    authorImage: user!.picture || "/default-avatar.jpg",
    authorName: user!.given_name || user!.family_name || user!.email?.split('@')[0] || "Anonymous"
  }
})
 
 return redirect("/dashbord")
} 