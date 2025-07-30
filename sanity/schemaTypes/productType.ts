import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fieldsets: [
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
    { name: "productDetails", title: "Product Details", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      fieldset: "hero",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "string",
      description: "A brief summary of the product for the hero section.",
      fieldset: "hero",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      fieldset: "hero",
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      fieldset: "hero",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      fieldset: "hero",
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      fieldset: "hero",
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
      fieldset: "hero",
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: { type: "brand" },
      fieldset: "hero",
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
      fieldset: "hero",
    }),
    defineField({
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string", title: "Feature ID (for icon mapping)" },
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
            { name: "description", type: "string", title: "Description" },
          ]
        }
      ],
      fieldset: "hero",
    }),
    defineField({
      name: "keyHighlights",
      title: "Key Highlights",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "hero",
    }),
    defineField({
      name: "trustIndicators",
      title: "Trust Indicators",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "hero",
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "subcategory" }],
      validation: (Rule) => Rule.required(),
      fieldset: "hero",
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "A detailed description of the product for the Product Details section.",
      fieldset: "productDetails",
    }),
    defineField({
      name: "specifications",
      title: "Technical Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", type: "string", title: "Category" },
            {
              name: "specs",
              title: "Specs",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "value", type: "string", title: "Value" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      fieldset: "productDetails",
    }),
    defineField({
      name: "downloads",
      title: "Downloads",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "type", type: "string", title: "Type (e.g. PDF, ZIP)" },
            { name: "size", type: "string", title: "Size (e.g. 2.4 MB)" },
            { name: "url", type: "file", title: "File" },
            { name: "icon", type: "string", title: "Icon (use icon key, e.g. 'FileText', 'Wrench', etc.)" },
          ]
        }
      ],
      fieldset: "productDetails",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: `$${subtitle}`,
        media: image,
      };
    },
  },
});
