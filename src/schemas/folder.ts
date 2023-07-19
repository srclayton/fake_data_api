export const replyFolderSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    title: { type: "string", format: "title" },
  },
  required: ["_id", "title"],
};
