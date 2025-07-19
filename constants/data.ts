import { title } from "process";

export const headerData = [
  // { title: "Home", href: "/" },
  { title: "Products", href: "/shop" },
  { title: "Solutions", href: "/solutions" },
  { title: "Case Study", href: "/case-study" },

  {
    title: "Company",
    href: "#",
    children: [
      { title: "Contact", href: "/contact" },
      { title: "About", href: "/about" },
      { title: "Resources", href: "#" },
      { title: "Blog", href: "/blog" },
    ],
  },
];
export const quickLinksData = [
  { title: "About us", href: "/about" },
  { title: "Contact us", href: "/contact" },
  { title: "Blog", href: "/blog" },
  {title: "Orders", href: "/orders"}
];
export const usefulLinksData = [
  
  { title: "Help", href: "/help" }, 
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "FAQs", href: "/faqs" },
];
export const contactInfoData = [
  { type: "Address", value: "Nairobi, kenya" },
  { type: "Email", value: "info2techurvesolutions.co.ke" },
  { type: "Phone 1", value: "+254 000 000 000" },
  { type: "Phone 2", value: "+254 111 000 000" },
];

export const productType = [
  { title: "CCTv Video Surveillance", value: "cctv" },
  { title: "Biometrics & Access Control", value: "biometrics" },
  { title: "Perimeter Security", value: "perimeter" },
  { title: "Intrusion Detection", value: "intrusion_detection" },
  { title: "IoT Smart Homes", value: "smart_homes" },
  { title: "Parking Management", value: "parking_management" },
  { title: "Interactive Digital Boards", value: "digital_boards" },
  { title: "Software & Applications", value: "software" },
  { title: "Connectivity & Infrastructure", value: "connectivity" }, 
  // { title: "Others", value: "others" }, 

];

