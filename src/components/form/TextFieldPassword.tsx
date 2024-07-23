import { Visibility, VisibilityOff, VpnKey } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import { FormikProps } from 'formik';
import { useState } from 'react'

type TextFieldPasswordProp<T> = {
  formik: FormikProps<T>;
  show?: boolean;
  name: keyof T;
}

const TextFieldPassword = <T extends {}>({ formik, name }: TextFieldPasswordProp<T>) => {
  const [show, setShow] = useState(false);

  return (
    <FormControl sx={{ m: "8px 0px 25px 0" }} fullWidth >
      <TextField

        id={String(name)}
        name={String(name)}
        label={String(name) + " *"}
        type={show ? 'text' : 'password'}
        placeholder={`Plz enter your ${String(name)}`}

        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && String(formik.errors[name] === undefined ? "" : formik.errors[name])}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKey />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  )
}

export default TextFieldPassword