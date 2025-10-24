// app/actions/createComment.ts
"use server";

import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function createComment(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  
  if (!userId) {
    redirect("/auth-callback"); // Redirect to login instead of returning error
    return; // This return is needed for TypeScript
  }

  const postId = formData.get("postId") as string;
  const content = formData.get("content") as string;

  await prisma.comment.create({
    data: {
      postId,
      userId,
      content
    }
  });

  // Refresh the page to show new comment
  redirect(`/post/${postId}`); 
}