export const replyImageSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    title: { type: "string", format: "title" },
    folder: { type: "string", format: "uuid" },
    image_url: { type: "string", format: "url" },
  },
  required: ["_id", "title", "folder", "image_url"],
};
export const replyImageByFolderSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    title: { type: "string", format: "title" },
    image_url: { type: "string", format: "url" },
  },
  required: ["_id", "title", "folder", "image_url"],
};
export const paramsImageSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "ID da imagem",
    },
  },
};
export const paramsImageByFolderSchema = {
  type: "object",
  properties: {
    folder: {
      type: "string",
      format: "uuid",
      description: "ID da pasta",
    },
  },
};
