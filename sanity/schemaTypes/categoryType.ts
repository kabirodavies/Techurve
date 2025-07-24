import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "range",
      type: "number",
      description: "Starting from",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "icon",
      title: "Category Icon",
      type: "string",
      description: "Select an icon for this category (matches keys in featureIconMap)",
      options: {
        list: [
          { title: "cctv", value: "cctv" },
          { title: "time_attendance", value: "time_attendance" },
          { title: "access_control", value: "access_control" },
          { title: "fingerprint", value: "fingerprint" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "icon", // This will be handled in the frontend
    },
  },
});
