export const replyUserSchema = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    name: { type: "string", format: "name" },
    email: { type: "string", format: "email" },
    username: { type: "string", format: "username" },
  },
  required: ["_id", "email", "username"],
};

export const replyUserAboutSchema = {
  type: "object",
  properties: {
    registered_at: { type: "string", format: "date-time" },
    birthdate: { type: "string", format: "date-time" },
    gender: { type: "string", format: "gender" },
    bio: { type: "string", format: "bio" },
    job_area: { type: "string", format: "job_area" },
    job_type: { type: "string", format: "job_type" },
    job_description: { type: "string", format: "job_description" },
    job_title: { type: "string", format: "job_title" },
    zodiac_sign: { type: "string", format: "zodiac_sign" },
  },
};

export const replyUserAddressSchema = {
  type: "object",
  properties: {
    zip_code: { type: "string", format: "zip_code" },
    street: { type: "string", format: "street" },
    number: { type: "number", format: "number" },
    district: { type: "string", format: "district" },
    city: { type: "string", format: "city" },
    state: { type: "string", format: "state" },
  },
  required: ["zip_code", "street", "district", "city", "state"],
};

export const replyUserCreditCardSchema = {
  type: "object",
  properties: {
    cc_name: { type: "string", format: "name" },
    cc_issuer: { type: "string", format: "issuer" },
    cc_number: { type: "string", format: "credit_card_number" },
    cc_cvv: { type: "number", format: "cvv" },
    cc_expiration: { type: "string", format: "expiration_date" },
  },
  required: ["cc_number", "cc_name", "cc_expiration"],
};

export const replyUserByIdSchema = {
  type: "object",
  properties: {
    name: { type: "string", format: "name" },
    email: { type: "string", format: "email" },
    username: { type: "string", format: "username" },
    avatar: { type: "string", format: "url" },
    about: { $ref: "UserAbout#" },
    address: { $ref: "UserAddress#" },
    credit_card: { $ref: "UserCreditCard#" },
  },
  required: ["name", "email", "username"],
};

export const paramsUserSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "Id do usuário",
    },
  },
};
