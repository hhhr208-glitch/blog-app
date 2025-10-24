import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function  Navbar (){
const{getUser} = getKindeServerSession();
const user = await getUser() ;
return (

 <nav className="py-5 flex items-center justify-between ">

  <div className=" flex items-center gap-6 ml-8"><h1 className="text-3xl">Blog <span className="text-red-500 mr-6"> Rasool </span></h1>
  
  <div className="hidden sm:flex items-center gap-6">
  
  <Link href="/"  className="hover:text-gray-500 transition-colors"> Home </Link>
    <Link href="/dashbord"  className="hover:text-gray-500 transition-colors"> Dashbord </Link>
      <Link href="/about"  className="hover:text-gray-500 transition-colors"> about </Link>
  </div>
   
   
  
   
  
  </div>
   
  <div className="flex items-center gap-4 mr-6">

    {user ? ( <div className="flex items-center gap-4">
      <p> {user.given_name}</p>
      <LogoutLink className={buttonVariants()}>log out <output></output></LogoutLink>
    </div>
  ) : 
    (


<div className="mr-6">


  <RegisterLink className={buttonVariants()}>sign up </RegisterLink>
 <LoginLink className={buttonVariants()}>log in </LoginLink>

</div>



    )
   
  
  
  }
  
 
  
  </div>

 </nav>


)

}