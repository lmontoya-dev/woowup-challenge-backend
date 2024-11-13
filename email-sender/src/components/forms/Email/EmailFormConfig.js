import * as Yup from "yup";

export const initialValues = {
  to: "",
  subject: "",
  body: "",
  files: [],
};

export const validationSchema = Yup.object({
  to: Yup.string().email("Invalid email address").required("Required"),
  subject: Yup.string().required("Required"),
  body: Yup.string().required("Required"),
  files: Yup.mixed().notRequired(),
});
