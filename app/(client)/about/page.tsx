// "use client";

// import React from 'react';
// import HeroSection from "@/components/HeroSection";
// import { motion, AnimatePresence } from "motion/react";
// import Image from "next/image";
// import Link from "next/link";
// import Container from "@/components/Container";
// import { ArrowRightCircle, CheckCircle, Play, Users, Award, FolderOpen, Globe, BarChart3, Code, Shield, Clock, Headphones, ChevronDown, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
// import Testimonials from "@/components/Testimonials";
// import { GET_TESTIMONIALS } from "@/sanity/queries/query";
// import { client } from "@/sanity/lib/client";
// import { useEffect, useState } from "react";

// const AboutPage = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchTestimonials() {
//       try {
//         const data = await client.fetch(GET_TESTIMONIALS);
//         setTestimonials(data);
//       } catch (error) {
//         console.error('Error fetching testimonials:', error);
//         setTestimonials([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchTestimonials();
//   }, []);

//   const services = [
//     {
//       icon: "📄",
//       title: "Web Design",
//       description: "Creative and responsive web design solutions that captivate your audience."
//     },
//     {
//       icon: "💻",
//       title: "Web Development",
//       description: "Custom web development with cutting-edge technologies and best practices."
//     },
//     {
//       icon: "🔍",
//       title: "SEO Services",
//       description: "Comprehensive SEO optimization to boost your online visibility and rankings."
//     }
//   ];

//   const features = [
//     {
//       icon: BarChart3,
//       title: "Proven Track Record",
//       description: "Years of successful project delivery and client satisfaction."
//     },
//     {
//       icon: Headphones,
//       title: "24/7 Support",
//       description: "Round-the-clock technical support and maintenance services."
//     },
//     {
//       icon: Users,
//       title: "Expert Team",
//       description: "Skilled professionals with deep industry expertise."
//     },
//     {
//       icon: Shield,
//       title: "Reliable & Secure",
//       description: "Enterprise-grade security and reliable infrastructure."
//     }
//   ];

//   const teamMembers = [
//     {
//       name: "Jonathon Doe",
//       position: "Teaching Specialist of Accounting",
//       image: "/team/member1.jpg"
//     },
//     {
//       name: "John Doe",
//       position: "Assistant Teacher",
//       image: "/team/member2.jpg"
//     },
//     {
//       name: "Nancy Stempin",
//       position: "Professor of Chemistry",
//       image: "/team/member3.jpg"
//     },
//     {
//       name: "Nancy Stempin",
//       position: "Professor of Architecture",
//       image: "/team/member4.jpg"
//     }
//   ];

//   const clientLogos = [
//     { name: "slack", logo: "/clients/slack.png" },
//     { name: "NETFLIX", logo: "/clients/netflix.png" },
//     { name: "Google", logo: "/clients/google.png" },
//     { name: "airbnb", logo: "/clients/airbnb.png" },
//     { name: "UBER", logo: "/clients/uber.png" }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <HeroSection title="" showImage={true} />

//       {/* Innovative Software Solutions Section */}
//       <section className="py-20 bg-white">
//         <Container>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center"
//           >
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
//               <span className="text-orange-500 font-semibold">About Us</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
//               Innovative Software Solutions for the Future
//             </h2>
//           </motion.div>
//         </Container>
//       </section>

//       {/* The Impact of Technology Section */}
//       <section className="py-20 bg-gray-50">
//         <Container>
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h3 className="text-3xl font-bold text-gray-900 mb-6">
//                 The Impact of Technology on Modern Society
//               </h3>
//               <p className="text-gray-600 mb-6 leading-relaxed">
//                 Technology has fundamentally transformed how we live, work, and interact with the world around us. From the way we communicate to how we conduct business, technology has become an integral part of our daily lives.
//               </p>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 In healthcare, technology has revolutionized patient care through telemedicine, AI-powered diagnostics, and advanced medical devices. In education, digital platforms have made learning more accessible and personalized than ever before.
//               </p>
//               <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//                 Read More
//               </button>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="bg-blue-600 rounded-2xl p-8 h-80 flex items-center justify-center">
//                 <div className="text-white text-center">
//                   <div className="text-6xl mb-4">💻</div>
//                   <p className="text-xl">Technology Illustration</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </Container>
//       </section>

//       {/* Your Satisfaction Our Service Section */}
//       <section className="py-20 bg-white">
//         <Container>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
//               <span className="text-orange-500 font-semibold">Our Services</span>
//             </div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-8">
//               Your Satisfaction, Our Service
//             </h2>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
//               >
//                 <div className="text-5xl mb-6">{service.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
//                 <p className="text-gray-600">{service.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </Container>
//       </section>

//       {/* Exploring the Boundaries Section */}
//       <section className="py-20 bg-gray-50">
//         <Container>
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <div className="bg-gray-800 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-blue-600/20"></div>
//                 <div className="relative z-10 text-white text-center">
//                   <div className="text-6xl mb-4">⌨️</div>
//                   <p className="text-xl">Technology in Action</p>
//                 </div>
//                 {/* Floating UI elements */}
//                 <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                   <CheckCircle className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="absolute bottom-8 left-6 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                   <BarChart3 className="w-3 h-3 text-white" />
//                 </div>
//                 <div className="absolute top-1/2 right-8 w-5 h-5 bg-purple-500 rounded-full"></div>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <h3 className="text-3xl font-bold text-gray-900 mb-6">
//                 Exploring the Boundaries of Human Ingenuity
//               </h3>
//               <p className="text-gray-600 mb-6 leading-relaxed">
//                 We push the limits of what's possible through innovative technology solutions. Our team combines creativity with technical expertise to deliver groundbreaking results that transform businesses and enhance human capabilities.
//               </p>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 From artificial intelligence to blockchain technology, we explore emerging technologies to create solutions that not only meet current needs but anticipate future challenges and opportunities.
//               </p>
//               <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//                 Learn More
//               </button>
//             </motion.div>
//           </div>
//         </Container>
//       </section>

//       {/* Where Experience Meets Compassion Section */}
//       <section className="py-20 bg-white">
//         <Container>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
//               <span className="text-orange-500 font-semibold">Why Choose Us</span>
//             </div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-8">
//               Where Experience Meets Compassion
//             </h2>
//           </motion.div>

//           <div className="relative">
//             {/* Central Gear */}
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center z-10">
//               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                 <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
//               </div>
//             </div>

//             {/* Feature Boxes */}
//             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//               {features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className={`bg-white rounded-lg p-6 shadow-lg text-center ${
//                     index % 2 === 0 ? 'md:text-right' : 'md:text-left'
//                   }`}
//                 >
//                   <div className={`w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 ${
//                     index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
//                   }`}>
//                     <feature.icon className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </Container>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-blue-900 text-white">
//         <Container>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
//               <span className="text-orange-400 font-semibold">Testimonial</span>
//             </div>
//             <h2 className="text-4xl font-bold mb-8">
//               Genuine Feedback, Honest Opinions
//             </h2>
//           </motion.div>

//           {loading ? (
//             <div className="text-center py-10">Loading testimonials...</div>
//           ) : testimonials.length > 0 ? (
//             <Testimonials testimonials={testimonials} />
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="max-w-4xl mx-auto"
//             >
//               <div className="bg-white rounded-2xl p-12 text-gray-900 text-center">
//                 <div className="text-6xl text-blue-600 mb-6">"</div>
//                 <blockquote className="text-2xl mb-8 text-gray-700">
//                   "Techurve has transformed our business with their innovative IT solutions. Their expertise and dedication to excellence have made them our trusted technology partner."
//                 </blockquote>
//                 <div className="flex items-center justify-center">
//                   <div className="w-12 h-12 bg-blue-600 rounded-full mr-4"></div>
//                   <div>
//                     <div className="font-bold text-gray-900">Ava Emily</div>
//                     <div className="text-gray-600">Stark Industries</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </Container>
//       </section>

//       {/* Client Logos Section */}
//       <section className="py-16 bg-white">
//         <Container>
//           <div className="grid grid-cols-5 gap-8 items-center">
//             {clientLogos.map((client, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
//                   {client.name}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </Container>
//       </section>

//       {/* Our Dedicated Team Section */}
//       <section className="py-20 bg-gray-50">
//         <Container>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
//               <span className="text-orange-500 font-semibold">Our Team</span>
//             </div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-8">
//               Our Dedicated Team
//             </h2>
//           </motion.div>

//           <div className="grid md:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
//                   <Users className="w-12 h-12 text-gray-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
//                 <p className="text-gray-600 mb-4">{member.position}</p>
//                 <div className="flex justify-center space-x-3 mb-4">
//                   <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
//                   <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
//                   <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-700 cursor-pointer" />
//                 </div>
//                 <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
//                   More Details
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         </Container>
//       </section>

//       {/* Newsletter Signup Section */}
//       <section className="py-20 bg-blue-900 text-white">
//         <Container>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-2xl mx-auto"
//           >
//             <h2 className="text-3xl font-bold mb-4">
//               Join our mailing list by providing your email address.
//             </h2>
//             <div className="flex flex-col sm:flex-row gap-4 mt-8">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//                 Submit
//               </button>
//             </div>
//           </motion.div>
//         </Container>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;




"use client";

import React from 'react';
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import { ArrowRightCircle } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import { GET_TESTIMONIALS } from "@/sanity/queries/query";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";


const AboutPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await client.fetch(GET_TESTIMONIALS);
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <div>
    <HeroSection title="" showImage={true} />


    
    <Container className="py-16">
      {/* Hero Section */}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-shop_dark_blue mb-4">
        About Techurve.</h2>
        <p className="text-xl text-gray-600 mb-8 text-center">
        Techurve is dedicated to advancing biometrics and security. Our innovative solutions are designed to empower businesses and individuals with robust, reliable protection in an ever-evolving digital landscape
        y solutions  and AI-based Biometric Solution. 
        </p>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20"
      >
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 text-center">
            {/* Elegant Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Our Solutions Work
              </h2>
              <div className="w-24 h-1 bg-shop_dark_blue mx-auto rounded-full"></div>
            </motion.div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {[
                {
                  icon: "🔍",
                  title: "Consultation",
                  description: "We assess your needs and recommend the best-fit solution.",
                  step: "01"
                },
                {
                  icon: "⚙️", 
                  title: "Integration",
                  description: "Seamless integration of devices and software for your environment.",
                  step: "02"
                },
                {
                  icon: "📈",
                  title: "Support & Growth", 
                  description: "Ongoing support and scalable solutions as your needs evolve.",
                  step: "03"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className="relative group"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-shop_dark_blue rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-shop_dark_blue/20">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Creative Meeting Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="relative"
            >
              <div className="bg-shop_dark_blue p-1 rounded-2xl shadow-lg">
                <div className="bg-white rounded-xl p-8 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-shop_dark_blue/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-shop_dark_blue/10 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Ready to Get Started?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Let&apos;s discuss your security needs and find the perfect solution for your business.
                    </p>
                    
                    <a 
                      href="https://calendly.com/techurvesolutions-info/30min" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_blue hover:underline transition-colors px-5 py-2 rounded-full border border-gray-300 bg-white text-black shadow text-sm md:text-base inline-flex items-center gap-4"
                    >
                      <span className="text-black">SET UP A MEETING</span>
                      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-shop_dark_blue w-8 h-8">
                        <ArrowRightCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
                 </section>
       </motion.div>

       {/* Testimonials Section */}
       <motion.div 
         initial={{ opacity: 0, y: 40 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.8 }}
         className="mt-20"
       >
         {loading ? (
           <div className="text-center py-10">Loading testimonials...</div>
         ) : testimonials.length > 0 ? (
           <Testimonials testimonials={testimonials} />
         ) : null}
       </motion.div>
     </Container>
     </div>
   );
 };

export default AboutPage;
