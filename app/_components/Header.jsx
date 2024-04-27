'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'

const Header = () => {
  const { user } = useUser();

  const [isSignInOrSignUp, setIsSignInOrSignUp] = useState(false);

  useEffect(() => {
    // Check if the current URL contains 'sign-in' or 'sign-up'
    const currentPage = window.location.href.toString();
    setIsSignInOrSignUp(currentPage.includes('sign-in') || currentPage.includes('sign-up'));
  }, []); // Dependency array is empty, ensuring it only runs once after initial render

  return !isSignInOrSignUp && (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8  shadow-md">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Image
              src='/logo.svg'
              alt='logo'
              width={50}
              height={50}
            />
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Home </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#">Explore </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About us </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact us </a>
                </li>


              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* If there's no user, show Login and Register options */}
            {!user ? (
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="/sign-in"
                >
                  Login
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              </div>
            ) : (
              // If there's a user, show a Logout option
              <div className='flex items-center gap-5'>
                <h2> <ShoppingCart className='flex gap-1 cursor-pointer'/>(0)      </h2>
                <UserButton afterSignOutUrl='/'/>
              </div>
            )}

            {/* Hamburger menu for smaller screens */}
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
