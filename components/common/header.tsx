import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./plan-badge";

export default function Header() {
  const isLoggedIn = false;
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Summarizerr
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center lg:gap-12 items-center gap-4">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex items-center gap-2">
            <NavLink href="/upload">Upload a PDF</NavLink>
            {/* <div className="">Pro</div> */}
            <PlanBadge />
            {/* <Button className="text-white text-base sm:text-lg lg:text-xl rounded-full bg-gradient-to-r from-rose-500 to-rose-800 hover:from-rose-600 hover:to-rose-900 transition-all duration-300">
              Sign Out
            </Button> */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
