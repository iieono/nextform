import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-orange-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      NEXTFORM
    </Link>
  );
}

export default Logo;
