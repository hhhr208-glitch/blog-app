"use server"
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Like(postId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  
  if (!userId) {
    return { error: "Please log in to like posts" }; // Return instead of throw
  }
  
  // Check if already liked
  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId
      }
    }
  });
  
  if (existingLike) {
    // Unlike - delete it
    await prisma.like.delete({
      where: { id: existingLike.id }
    });
    return { liked: false };
  } else {
    // Like - create it
    await prisma.like.create({
      data: { postId, userId }
    });
    return { liked: true };
  }
}