import { Button } from '@mui/material';
import { CSSProperties } from 'react';

type ButtonProp = {
  onClick: () => void;
  sx?: CSSProperties;
}

export const SubmitButton = ({ onClick, sx }: ButtonProp) => {
  return (
    <Button variant='contained'
      size='large'
      sx={{
        textTransform: "capitalize",
        ...sx,
      }}
      onClick={onClick}

    >Submit</Button>
  )
}