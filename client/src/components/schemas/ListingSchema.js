import * as Yup from "yup";

export const listingSchema = Yup.object({
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  province: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  price: Yup.number().required("Required").positive("Must be positive"),
  discount: Yup.number().integer("Must be number"),
});
