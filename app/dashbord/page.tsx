
import Link from "next/link";  // Correct import for navigation
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Show from "../showDataDashbord";

// import { Link } from "lucide-react";  // ← Remove this line
async function  getData(userId : string ) {

  const data = await prisma.blogPost.findMany({
    where:{
      authorId : userId
    },
    orderBy : {
      createdAt :"desc"
    }
  })
  return data
}
export default async function Dashboard() {
 const {getUser} = getKindeServerSession()
 const user =  await getUser()

const data = getData(user?.id as string)
  return (
    <div >
      <h2 className="ml-12 font-bold">your weblogs</h2>  {/* text-bold → font-bold */}
      <div className="flex justify-end items-center mr-8">  {/* items-cente → items-center */}
        <Link href="/dashbord/create
        ">
        <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mr-8">
  +
</div>
        </Link>
        
      </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
  {(await data).map((caseTable) =>
    <Show key={caseTable.id} {...caseTable} edit ={true}/>
  )}
</div>
      
    </div>
  );
}