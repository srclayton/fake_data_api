export const replyFolderSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    folder_name: { type: "string", format: "folder_name" },
  },
  required: ["_id", "folder_name"],
};
