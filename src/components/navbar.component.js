import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cookies } from 'next/headers'
import { LogInIcon } from 'lucide-react'
import LogOutButton from './auth/logout.component'

export default async function Navbar() {
  const cookiesStore = await cookies();
  

  return (
    <>
      <nav className='flex items-center justify-between bg-background/60 backdrop-blur-md shadow px-6 py-4 sticky bottom-0'>
        <Link href="/" className='text-xl font-semibold'>NextAuthentication</Link>

        <ul className='hidden md:flex items-center space-x-6'>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
          <li>
            <Link href="/profile">My Profile</Link>
          </li>
          {
            cookiesStore.get('authtoken')
              ? <li>
                <LogOutButton />
              </li>
              : <>
                <li>
                  <Link href="/signin" className={buttonVariants()}><LogInIcon /> SignIn</Link>
                </li>
                <li>
                  <Link href="/signup" className={buttonVariants()}><LogInIcon /> SignUp</Link>
                </li>
              </>
          }
        </ul>

        <Sheet>
          <SheetTrigger className="block md:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="block md:hidden">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="hidden">Mobile Menu</SheetDescription>
            </SheetHeader>

            <ul className='space-y-6 px-4'>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">About</Link>
              </li>
              <li>
                <Link href="/">Contact</Link>
              </li>
              <li>
                <Link href="/profile">My Profile</Link>
              </li>
              {
                cookiesStore.get('authtoken')
                  ? <li>
                    <LogOutButton />
                  </li>
                  : <>
                    <li>
                      <Link href="/signin" className={buttonVariants()}><LogInIcon /> SignIn</Link>
                    </li>
                    <li>
                      <Link href="/signup" className={buttonVariants()}><LogInIcon /> SignUp</Link>
                    </li>
                  </>
              }
            </ul>
          </SheetContent>
        </Sheet>

      </nav>
    </>
  )
}
