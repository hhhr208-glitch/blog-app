// app/actions/checkLikeStatus.ts
"use server";

import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkLikeStatus(postId: string): Promise<boolean> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  if (!userId) return false;

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId
      }
    }
  });

  return !!existingLike; // Returns true if like exists, false if not
}