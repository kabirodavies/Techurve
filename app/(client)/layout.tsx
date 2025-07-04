// import type { Metadata } from "next";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { ClerkProvider } from "@clerk/nextjs";

// export const metadata: Metadata = {
//   title: {
//     template: "%s - Techurve Solutions",
//     default: "Techurve Solutions",
//   },
//   description: "Techurve Solutions, Your one stop shop for all security needs",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className="font-poppins antialiased">
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             <main className="flex-1">{children}</main>
//             <Footer />
//           </div>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%T - Techurve Solutions",
    default: "Techurve Solutions",
  },
  description: "Discover curated security solutions at Techurve, blending technology to elevate your peace of mind and protect your digital and physical assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased">
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
