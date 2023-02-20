export default {
  name: "category",
  title: "Menu Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category name",
      type: "string",
      Validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image of category",
      type: "image",
    },
  ],
};
