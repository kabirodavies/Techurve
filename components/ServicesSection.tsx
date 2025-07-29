// import Link from "next/link";
// import { featureIconMap } from "@/constants/featureIcons";
// import { Shield } from "lucide-react";

// const solutions = [
//   {
//     title: "Biometric Access Control",
//     description:
//       "Secure your premises with advanced fingerprint and facial recognition systems.",
//     link: "/solutions/biometric-access-control",
//     icon: "access_control",
//   },
//   {
//     title: "Support & Maintenance",
//     description:
//       "Ongoing technical support and system maintenance to keep you secure.",
//     link: "/solutions/support-maintenance",
//     icon: "installation",
//   },
//   {
//     title: "Time Attendance System",
//     description:
//       "Our Time Attendance solution is designed to help businesses of all sizes efficiently manage employee attendance, eliminate time theft, and streamline payroll processing.",
//     link: "/solutions/time-attendance-system",
//     icon: "time_attendance",
//   },
// ];

// const ServicesSection = () => (
//   <section className="py-16">
//     <div className="max-w-7xl mx-auto px-4 mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-10 rounded-xl shadow-md">
//       <h2 className="text-3xl md:text-4xl font-bold text-center text-shop_dark_blue mb-4">
//         Discover curated security solutions.
//       </h2>
//       <p className="text-xl text-gray-600 mb-8 text-center">
//         and AI-based Biometric Solutions
//       </p>
//       <div className="w-full mb-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {solutions.map((solution, idx) => {
//             const Icon = typeof solution.icon === "string" && featureIconMap[solution.icon] ? featureIconMap[solution.icon] : Shield;
//             return (
//               <Link key={solution.title} href={solution.link} className="group relative">
//                 <div className="flex flex-col items-center w-full h-full px-2 md:px-6 py-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-500">
//                   {/* Icon Circle */}
//                   <div className="flex-shrink-0 mb-4">
//                     <span className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-dotted border-gray-300 bg-white">
//                       <Icon className="w-10 h-10 md:w-12 md:h-12 text-shop_dark_blue" />
//                     </span>
//                   </div>
//                   {/* Title & Description */}
//                   <div className="flex-1 min-w-0 text-center">
//                     <span className="block font-bold text-xl md:text-2xl text-black mb-1">{solution.title}</span>
//                     <p className="text-gray-600 mb-4 text-base md:text-lg line-clamp-2">{solution.description}</p>
//                     <span className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:underline group-hover:translate-x-1 transition">
//                       Learn More <span aria-hidden>→</span>
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//       <div className="text-center mt-8">
//         <Link
//           href="/solutions"
//           className="inline-block px-6 py-3 bg-shop_dark_blue text-white rounded-lg font-semibold shadow hover:bg-shop_orange transition-colors"
//         >
//           See All Solutions
//         </Link>
//       </div>
//     </div>
//   </section>
// );

// export default ServicesSection; 