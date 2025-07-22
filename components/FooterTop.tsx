import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "Nairobi, Kenya",
    icon: (
      <MapPin className="h-8 w-8 text-primary drop-shadow-sm transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+254 700-000-000",
    icon: (
      <Phone className="h-8 w-8 text-primary drop-shadow-sm transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 9:00 AM - 6:00 PM",
    icon: (
      <Clock className="h-8 w-8 text-primary drop-shadow-sm transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "info@techurvesolutions.co.ke",
    icon: (
      <Mail className="h-8 w-8 text-primary drop-shadow-sm transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <section
      className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 py-8 px-2 sm:px-6 lg:px-12"
      aria-label="Contact Information"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white rounded-xl shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-6 border border-gray-100 focus-within:ring-2 focus-within:ring-primary outline-none cursor-pointer"
            tabIndex={0}
            aria-label={`${item.title}: ${item.subtitle}`}
          >
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full p-3 group-hover:bg-primary/20 transition-colors">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FooterTop;
