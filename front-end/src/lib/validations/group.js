import * as yup from "yup";

export const groupSchema = yup.object({
  imageUrl: yup.string().trim().nullable().optional(),
  name: yup.string().trim().required(),
  slug: yup.string().trim().required(),
  members: yup.array(),
  maxAllowedMembership: yup.number(),
});
