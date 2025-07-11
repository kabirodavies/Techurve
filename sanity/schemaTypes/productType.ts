import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fieldsets: [
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
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
      name: "description",
      title: "Description",
      type: "string",
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
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "CCTv Video Surveillance", value: "cctv" },
          { title: "Biometrics & Access Control", value: "biometrics" },
          { title: "Perimeter Security", value: "perimeter_security" },
          { title: "Intrusion Detection", value: "intrusion_detection" },
          { title: "IoT Smart Homes", value: "smart_homes" },
          { title: "Parking Management", value: "parking_management" },
          { title: "Interactive Digital Boards", value: "digital_boards" },
          { title: "Software & Applications", value: "software" },
          { title: "Connectivity & Infrastructure", value: "connectivity" },
          { title: "Services & Solutions", value: "services" },
        ],
      },
      fieldset: "hero",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
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
