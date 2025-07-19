import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { usefulLinksData, quickLinksData, contactInfoData } from "@/constants/data";
import Link from "next/link";
import { Info, Mail, Book, ShoppingBag, HelpCircle, Shield, FileText, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Discover curated security solutions at Techurve, blending 
              technology to elevate your peace of mind and protect your digital and physical assets.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_dark_blue hover:text-shop_dark_blue"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => {
                let Icon;
                switch (item.title) {
                  case "About us":
                    Icon = Info;
                    break;
                  case "Contact us":
                    Icon = Mail;
                    break;
                  case "Blog":
                    Icon = Book;
                    break;
                  case "Orders":
                    Icon = ShoppingBag;
                    break;
                  default:
                    Icon = Info;
                }
                return (
                  <li key={item?.title}>
                    <Link
                      href={item?.href}
                      className="hover:text-shop_dark_blue hoverEffect font-medium flex items-center gap-2 group"
                    >
                      <Icon className="w-5 h-5 text-shop_dark_blue/70 group-hover:text-shop_dark_blue transition-colors" />
                      {item?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <SubTitle>Useful Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {usefulLinksData?.map((item) => {
                let Icon;
                switch (item.title) {
                  case "Help":
                    Icon = HelpCircle;
                    break;
                  case "Privacy Policy":
                    Icon = Shield;
                    break;
                  case "Terms & Conditions":
                    Icon = FileText;
                    break;
                  case "FAQs":
                    Icon = MessageSquare;
                    break;
                  default:
                    Icon = Info;
                }
                return (
                  <li key={item?.title}>
                    <Link
                      href={item?.href}
                      className="hover:text-shop_dark_blue hoverEffect font-medium flex items-center gap-2 group"
                    >
                      <Icon className="w-5 h-5 text-shop_dark_blue/70 group-hover:text-shop_dark_blue transition-colors" />
                      {item?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <SubTitle>Contact Info</SubTitle>
            <ul className="space-y-3 mt-4">
              {contactInfoData?.map((item) => (
                <li key={item?.type}>
                  <span className="font-medium">{item?.type}:</span> {item?.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
