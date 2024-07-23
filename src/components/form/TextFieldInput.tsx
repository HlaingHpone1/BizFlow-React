import { FormControl, TextField } from '@mui/material';
import { FormikProps } from 'formik';

type TextFieldProp<T> = {
  formik: FormikProps<T>;
  show?: boolean;
  name: keyof T;
  required?: boolean
}

const TextFieldInput = <T extends {}>({ formik, show, name, required = false }: TextFieldProp<T>) => {
  return (
    <FormControl sx={{ marginBottom: "20px" }} fullWidth >
      <TextField
        sx={{
          ...(show && {
            '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(0, 0, 0, 1)' }
          })
        }}
        id={String(name)}
        label={String(name) + (required ? " *" : "")}
        name={String(name)}
        placeholder={`Plz enter your ${String(name)}`}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && String(formik.errors[name])}
        disabled={show}
      />
    </FormControl>
  )
}

export default TextFieldInput