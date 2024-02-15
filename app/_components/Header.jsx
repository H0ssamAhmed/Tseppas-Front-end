"use client";
import { ModeToggleSimple } from "../../components/mode-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../_context/CartContext";
import cartApi from "../_utils/cartApi";
import PopupCart from "../category/_components/PopupCart";
import { cn } from "../../lib/utils";

const Header = () => {
  const { cart, setCart } = useContext(CartContext)
  const user = useUser();
  const [showCart, setShowCart] = useState(false)
  const [showNav, setShowNav] = useState(false)
  // const cartRef = useRef(null);

  const getUserCartItems_ = async () => {
    await cartApi.getUserCartItems(user.user.primaryEmailAddress.emailAddress).then((res) => {
      setCart(res.data.data)
    })
  }
  const handleShowCart = () => {
    setShowCart(!showCart);
  }

  const handleShowNav = () => {
    console.log("test");
    setShowNav(!showNav)
  }
  useEffect(() => {
    user.user && getUserCartItems_()
  }, [user.user])
  return (
    <>
      <header
        className="bg-white dark:bg-gray-900 w-full block relative shadow-md z-50"
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex h-16 items-center justify-between relative">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-cyan-600 dark:text-cyan-300" href="/">
                <Image
                  src="/logo-color.png"
                  width={100}
                  height={100}
                  alt="logo"
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/logo-white.png"
                  width={100}
                  height={100}
                  alt="logo"
                  className="object-contain  hidden dark:block"
                />
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className={cn("hidden md:block transition-all ", showNav && 'block')} >
                <ul onClick={() => setShowNav(false)} className={cn("flex items-center gap-6 text-sm", showNav && "py-4 flex-col absolute z-20 w-full left-0 top-[64px] bg-gray-200 dark:bg-gray-700")}>
                  <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                      href='/' >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                      href='/category'>
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                      href='/contact-us'>
                      Contact us
                    </Link>
                  </li>


                </ul>
              </nav>
              <div className="flex items-center gap-4">
                {user.isSignedIn ? (
                  <div className="flex justify-center items-center gap-2">
                    <div className=" cursor-pointer flex justify-center flex-col w-fit px-2"
                      onClick={handleShowCart}>
                      <span className="flex justify-center items-center">
                        ({cart.length})
                      </span>
                      <ShoppingCart />
                    </div>
                    <UserButton afterSignOutUrl="/" />
                    <ModeToggleSimple />
                    <PopupCart theCart={cart} showCart={showCart} setShowCart={setShowCart} // ref={cartRef}
                    />
                  </div>
                ) : (
                  <div className="sm:flex sm:gap-4">
                    <Link
                      href="/sign-in"
                      className="rounded-md bg-primary hover:bg-primary/80   px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-cyan-600"
                    >
                      Login
                    </Link>

                    <div className="hidden sm:flex">
                      <Link
                        href="/sign-up"
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-cyan-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}

                <div className="block md:hidden">
                  <button onClick={handleShowNav} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
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
        </div>
      </header>
    </>
  );
};

export default Header;
