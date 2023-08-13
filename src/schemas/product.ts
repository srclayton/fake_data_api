export const replyProductSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "number", format: "double" },
    available: { type: "boolean" },
  },
  required: ["_id", "title", "description", "price", "available"],
};

export const replyProductByIdSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "number", format: "double" },
    category: { type: "array", items: { type: "string" } },
    stock_quantity: { type: "number" },
    images: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string", format: "uuid" },
          folder_id: { type: "string", format: "uuid" },
          url: { type: "string" },
        },
      },
    },
    reviews: {
      type: "array",
      items: {
        type: "object",
        properties: {
          user: { type: "string" },
          rating: { type: "number" },
          comment: { type: "string" },
          created_at: { type: "string", format: "date-time" },
        },
      },
    },
    average_rating: { type: "number" },
    weight: { type: "number" },
    dimensions: {
      type: "object",
      properties: {
        width: { type: "number" },
        height: { type: "number" },
        depth: { type: "number" },
      },
    },
    available: { type: "boolean" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
  required: ["_id", "title", "price", "stock_quantity", "available"],
};
