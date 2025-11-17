"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={"bg-(--bg-color)"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="flex items-center justify-between h-16">
          {/* Logo và Tên thương hiệu */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-(--main-color) hover:opacity-80 transition duration-150"
          >
            <Image
              src={"/images/logo.svg"}
              alt={"Tripzy - Travel Smarter, Not Harder"}
              width={40}
              height={40}
            />
            <span>Tripzy</span>
          </Link>
          {/* Liên kết điều hướng */}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
