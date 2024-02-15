"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Facebook } from "lucide-react";
import { FaceIcon } from "@radix-ui/react-icons";

const Footer = () => {
  const { user } = useUser();

  return <div className="bg-primary my-4 text-white">
    <div className="px-4 py-16 w-[95vw] md:w-[80vw] max-w-screen-xl m-auto grid gap-6 grid-cols-2 md:grid-cols-3 items-center">

      <div className=" col-span-2 text-center flex justify-center md:col-span-1">
        <Image
          src="/logo-white.png"
          width={250}
          height={250}
          alt="logo"
          className="object-contain"
        />
      </div>
      <div className=" capitalize">
        <h4 className="text-lg my-4">
          quick links
        </h4>
        <ul>
          <li className="text-sm hover:underline transition"><Link href='/#best'>best seller</Link></li>
          <li className="text-sm hover:underline transition"><Link href='/#best'>Menu</Link></li>
          <li className="text-sm hover:underline transition"><Link href='/category'>categories</Link></li>
          <li className="text-sm hover:underline transition"><Link href='/#By-Category'>By Category</Link></li>
        </ul>
      </div>
      <div className="">
        <h4 className="text-lg my-4">
          Useful Links
        </h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Returns & Refunds</li>
        </ul>
      </div>

    </div>
  </div>
};

export default Footer;
