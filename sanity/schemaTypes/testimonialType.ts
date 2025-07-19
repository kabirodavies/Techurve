import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", validation: Rule => Rule.required() }),
    defineField({ name: "clientName", title: "Client Name", type: "string", validation: Rule => Rule.required() }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "companyLogo", title: "Company Logo", type: "image", options: { hotspot: true } }),
  ],
}); 