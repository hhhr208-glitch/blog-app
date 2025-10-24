// In your actions/deletePost.ts
"use server"; // ← Add this!

import { prisma } from "@/app/utils/db";
import { revalidatePath } from "next/cache";

export async function deletePost(formData: FormData) {
  "use server"; // ← This makes it a server action
  
  const postId = formData.get("postId") as string;
  
  await prisma.blogPost.delete({
    where: { id: postId }
  });
  
  revalidatePath("/dashboard");
}