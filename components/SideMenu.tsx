import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
import { Fingerprint } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  // Separate items with and without children
  const itemsWithChildren = headerData.filter((item) => item.children && Array.isArray(item.children));
  const itemsWithoutChildren = headerData.filter((item) => !item.children);

  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full
         bg-black/50 text-white/80 shadow-xl ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         } hoverEffect`}
    >
      <div
        ref={sidebarRef}
        className="min-w72 max-w-96 bg-shop_dark_blue h-screen p-10
     border-r border-r-shop_light_blue flex flex-col gap-6"
      >
        <div className="flex items-center justify-between gap-5">
          <Fingerprint className="w-8 h-8 mr-2 text-white" />
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            onClick={onClose}
            className="hover:text-shop_light_blue hoverEffect"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {/* Render items without children as simple links */}
          {itemsWithoutChildren.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              className={`hover:text-shop_light_green hoverEffect ${
                pathname === item?.href && "text-shop_light_green"
              }`}
              onClick={onClose}
            >
              {item?.title}
            </Link>
          ))}
          {/* Render items with children as accordions */}
          {itemsWithChildren.length > 0 && (
            <Accordion type="multiple" className="w-full">
              {itemsWithChildren.map((item) => (
                <AccordionItem value={item.title} key={item.title}>
                  <AccordionTrigger className="text-white hover:text-shop_light_green">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col pl-4 space-y-2">
                      {item.children.map((child: { title: string; href: string }) => (
                        <Link
                          href={child.href}
                          key={child.title}
                          className={`hover:text-shop_light_green hoverEffect text-white/80 text-base font-normal ${
                            pathname === child.href ? "text-shop_light_green font-semibold" : ""
                          }`}
                          onClick={onClose}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
