import * as Yup from "yup";

export const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("required"),
  newPassword: Yup.string().required("required"),
});
