"use client";

// import { Check, Link, Home, Package, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react'

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

  const validateEmail = (email: string) => {
    // Simple email regex
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
      // Here you would handle the actual submission (e.g., API call)
    }
  };

  return (
    <div className="py-5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl flex flex-col gap-8 shadow-2xl p-6 max-w-xl w-full text-center"
          >

    
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <div className="space-y-4 mb-4 text-left">
  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
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
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
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
      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
        Subject
      </label>
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
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Message
      </label>
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

  <p className="text-gray-700">
    Thank you for choosing us. We&apos;ll reach out as soon as possible.
  </p>
</div>
          </motion.div>
        </div>
  )
}

export default ContactForm