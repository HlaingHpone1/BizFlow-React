import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  mail: Yup.string().required("Email Required"),
  password: Yup.string().required("Password Required"),
});