import * as yup from "yup";

export const billSchema = yup.object({
  title: yup.string().required(),
  //   category: yup
  //     .enum(products.category.enumValues, {
  //       required_error: "Must be a valid category",
  //     })
  //     .default(products.category.enumValues[0]),
  group: yup.string().required(),
  price: yup.number(),
  payers: yup
    .array(yup.string().required())
    .ensure()
    .min(1, "payers is a required field"),
});
