
import Link from "next/link";
import { prisma } from "./utils/db";
import { Content } from "next/font/google";
import Show from "./showDataDashbord";
async function getdata() {
  const data = await prisma.blogPost.findMany({
   
  });
  return data;
}


export  default async function Home() {
  const data = await getdata()
  return (
     <div className="py-6">
      <h1 className=" text-3xl font-bold ml-8 ">latest posts</h1>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
       {(await data).map((caseTable) =>
         <Show key={caseTable.id} {...caseTable} edit={false} />
         
       )}
     </div>
     </div>
  );
}
