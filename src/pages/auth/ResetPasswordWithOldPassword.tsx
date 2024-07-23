import SettingPaper from '../../layouts/SettingPaper'
import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup";
import TextFieldPassword from '../../components/form/TextFieldPassword'
import { SubmitButton } from '../../components/button/Buttons';
import { restPasswordWithOldPassword } from '../../api/auth';
import { alertStore } from '../../store/alertStore';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store/userStore';

type ResetPasswordWithOldPasswordProp = {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordWithOldPasswordVaildaion = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string().notOneOf([Yup.ref("oldPassword")], "New Password cannot be the same as Old Password").required("New Password is required"),
  confirmPassword: Yup.string().notOneOf([Yup.ref("oldPassword")], "New Password cannot be the same as Old Password").oneOf([Yup.ref("newPassword")], "Passwords must match").required("Confirm Password is required"),
})

const ResetPasswordWithOldPassword = () => {

  const { setAlert } = alertStore();
  const navigate = useNavigate();

  const { userData } = userStore();

  const formik = useFormik<ResetPasswordWithOldPasswordProp>({
    initialValues: {
      email: userData?.email || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: ResetPasswordWithOldPasswordVaildaion,
    onSubmit: (value) => {
      restPasswordWithOldPassword(value).then((response) => {
        if (response.data.meta.code === 200) {
          setAlert(true, "Password changed successfully", "success");
          navigate("/settings/security")
        }
      })
    }
  })

  return (
    <>
      <SettingPaper>
        <Typography component="h1" sx={{
          marginBottom: "2rem",

          fontSize: "2.5rem",
          fontFamily: "Roboto Slab Variable",
          fontWeight: 700,

        }}>
          Change Password
        </Typography>

        <Box sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
        }}
        >
          <TextFieldPassword formik={formik} name="oldPassword" />
          <TextFieldPassword formik={formik} name="newPassword" />
          <TextFieldPassword formik={formik} name="confirmPassword" />
        </Box>

        <SubmitButton onClick={formik.submitForm} />
      </SettingPaper>
    </>
  )
}

export default ResetPasswordWithOldPassword