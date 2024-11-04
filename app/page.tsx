import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const navitems = (
    <>
      <li className="mr-3 text-lg text-white-700">
        <Link href="/portfolio">Portfolio</Link>
      </li>
      <li className="mr-3 text-lg">
        <Link href="/timeline">Experience</Link>
      </li>
      <li className="mr-3 text-lg text-white-700 hover:text-[#757575]">
        <Link href="/about">About</Link>
      </li>
      <li className="mr-3 text-lg text-white-700 hover:text-[#757575]">
        <Link href="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <div className="flex justify-between items-center h-20">
      <h2>Taxi Booking</h2>

      <nav>
        <ul className="flex justify-between">{navitems}</ul>
      </nav>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
