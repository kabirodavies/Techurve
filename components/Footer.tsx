import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { usefulLinksData, quickLinksData, contactInfoData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_dark_blue hoverEffect font-medium flex items-center gap-2"
                  >
                    <span className="text-lg">&gt;&gt;</span> {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Useful Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {usefulLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.title}`}
                    className="hover:text-shop_dark_blue hoverEffect font-medium flex items-center gap-2"
                  >
                    <span className="text-lg">&gt;&gt;</span> {item?.title}
                  </Link>
                </li>
              ))}
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
