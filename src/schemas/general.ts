export const paramsByPage = {
  type: "object",
  properties: {
    page: {
      type: "number",
      description: "Numero da pagina",
    },
  },
  required: ["page"],
};
