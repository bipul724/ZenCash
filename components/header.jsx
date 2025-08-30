import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image'; 
import { Button } from "./ui/button";
import { Layout, LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";



const Header = async () => {

  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="w-full px-3 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/cover.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
        
        {/* ✅ Move auth buttons INSIDE nav container */}
        <div className="flex items-center space-x-4">

          <SignedIn>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedIn>
            <Link href="/transactions/create" >
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements:{
                avatarBox: "w-10 h-10",
              },
            }}/>
          </SignedIn>
        </div>
      </nav>
    </div>
  )
}

export default Header
