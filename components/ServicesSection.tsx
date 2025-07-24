import Link from "next/link";

const solutions = [
  {
    title: "Biometric Access Control",
    description:
      "Secure your premises with advanced fingerprint and facial recognition systems.",
    link: "/solutions/biometric-access-control",
  },
  {
    title: "Support & Maintenance",
    description:
      "Ongoing technical support and system maintenance to keep you secure.",
    link: "/solutions/support-maintenance",
  },
  {
    title: "Time Attendance System",
    description:
      "Our Time Attendance solution is designed to help businesses of all sizes efficiently manage employee attendance, eliminate time theft, and streamline payroll processing.",
    link: "/solutions/time-attendance-system",
  },
];

const ServicesSection = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-10 rounded-xl shadow-md">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-shop_dark_blue mb-4">Explore Our Solutions</h2>
      <p className="text-xl text-gray-600 mb-8 text-center">Discover our range of security and business solutions</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {solutions.map((solution) => (
          <Link key={solution.title} href={solution.link} className="group relative">
            <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center border-t border-b border-gray-100 hover:border-t-blue-500 hover:border-b-blue-500 hover:-translate-y-1 hover:scale-[1.03]">
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />
              {/* Title */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">{solution.title}</h3>
              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-2">{solution.description}</p>
              {/* Learn More */}
              <span className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:underline group-hover:translate-x-1 transition">
                Learn More <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/solutions"
          className="inline-block px-6 py-3 bg-shop_dark_blue text-white rounded-lg font-semibold shadow hover:bg-shop_orange transition-colors"
        >
          See All Solutions
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesSection; 