import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Fingerprint } from "lucide-react"; // Example icon, you can use any icon you prefer

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"} className="inline-flex items-center">
      <Fingerprint className="w-5 h-5 mr-2 text-shop_dark_blue" />
      <h2
        className={cn(
          "text-2xl text-shop_dark_blue font-black tracking-wider uppercase hover:text-black/90 hoverEffect group font-sans",
          className
        )}
      >
        Techurve{" "}
        <span
          className={cn(
            "text-black/90 group-hover:text-shop_dark_blue hoverEffect",
            spanDesign
          )}
        >
          Solutions
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
