export const replyImageSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    filename: { type: "string", format: "filename" },
    contentType: { type: "string", format: "contentType" },
    folder_id: { type: "string", format: "uuid" },
    image_url: { type: "string", format: "url" },
  },
  required: ["_id", "filename", "folder_id", "image_url"],
};
export const replyImageByFolderSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    filename: { type: "string", format: "title" },
    contentType: { type: "string", format: "contentType" },
    image_url: { type: "string", format: "url" },
  },
  required: ["_id", "filename", "folder_id", "image_url"],
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
