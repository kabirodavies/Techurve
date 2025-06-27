"use client";

import { Check, Link, Home, Package, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react'

const ContactForm = () => {
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
  <form className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Your Name"
      />
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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="you@example.com"
      />
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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="How can we help you?"
      />
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