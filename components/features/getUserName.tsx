import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getName(param : string){
const {getUser} = getKindeServerSession();
const user =  await getUser();

return user?.given_name




}