// app/actions/updatePost.ts
"use server";

import { prisma } from "@/app/utils/db";  // ← Use absolute path
import { redirect } from "next/navigation";


export async function updatePost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const id = formData.get("id") as string;
  
  await prisma.blogPost.update({
    where: { id },
    data: { title, content }
  });
    redirect("/dashbord"); // ← Add this
}