"use client";

import { motion } from 'motion/react';
import React from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaCalendarAlt, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa';
import HeroSection from "@/components/HeroSection";

const CONTACTS = {
  email: 'sales@techurvesolutions.co.ke',
  support: 'support@techurvesolutions.co.ke',
  usPhone: '+1 (321) 340-3301',
  euPhone: '+358 75325 8188',
  whatsapp: '+358 75325 8188',
  address: 'Nairobi, Kenya',
  socials: [
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaSpotify />, url: 'https://spotify.com', label: 'Spotify' },
  ],
};

const ContactForm = () => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = React.useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };
    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required.';
      valid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required.';
      valid = false;
    }
    setErrors(newErrors);
    if (valid) {
      setSubmitted(true);
      // Here you would handle the actual submission (e.g., API call)
    }
  };

  return (
    <div>
      <HeroSection title="Contact Us" subtitle="Let’s connect you with the right person for support, consultancy, or sales." showImage={false}>
        <div className="mt-8 flex flex-wrap items-center gap-8 text-base py-2 px-0 mb-2 z-10 relative justify-center">
        </div>
      </HeroSection>
      <div className="py-10 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl px-4"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Talk to Us</h1>
            <p className="text-lg text-gray-600">Let’s connect you with the right person for support, consultancy, or sales. Please choose your preferred contact method below.</p>
          </div>
          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Contact Options */}
            <div className="md:w-1/2 flex flex-col gap-6 bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Send contact form</h2>
                <p className="text-gray-600 text-sm">Tell us a bit about yourself and we’ll connect you with the right person.</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">Schedule a call</span>
                <a href="#" className="ml-auto text-blue-600 hover:underline text-sm">Pick a date</a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">Write to us</span>
                <a href={`mailto:${CONTACTS.email}`} className="ml-auto text-blue-600 hover:underline text-sm">{CONTACTS.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">Call us on</span>
                <div className="ml-auto flex flex-col text-right text-sm">
                  <span>US: <a href="tel:+13213403301" className="text-blue-600 hover:underline">{CONTACTS.usPhone}</a></span>
                  <span>EU: <a href="tel:+358753258188" className="text-blue-600 hover:underline">{CONTACTS.euPhone}</a></span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-green-600 text-lg" />
                <span className="font-medium text-gray-700">WhatsApp number</span>
                <a href="https://wa.me/358753258188" className="ml-auto text-blue-600 hover:underline text-sm">EU: {CONTACTS.whatsapp}</a>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <FaMapMarkerAlt className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">Valo Motion HQ</span>
                <span className="ml-auto text-gray-600 text-sm">{CONTACTS.address}</span>
              </div>
              {/* Map Placeholder */}
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm mt-2">Map of ValoMotion HQ</div>
            </div>
            {/* Right: Contact Form */}
            <div className="md:w-1/2 flex flex-col gap-6 bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Form</h2>
              {submitted ? (
                <div className="text-green-600 text-center font-medium py-8">Thank you for contacting us! We’ll reach out as soon as possible.</div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.subject ? 'border-red-500' : ''}`}
                      placeholder="Subject"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
          {/* Footer: Socials and Support */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-6">
            <div className="flex items-center gap-4">
              {CONTACTS.socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 text-2xl" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="text-gray-600 text-sm text-center md:text-right">
              Need help? <a href={`mailto:${CONTACTS.support}`} className="text-blue-600 hover:underline">{CONTACTS.support}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;