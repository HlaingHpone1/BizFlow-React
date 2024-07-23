import { Paper } from '@mui/material'
import { ReactElement, ReactNode } from 'react'


type SettingPaperProp = {
  children: ReactNode;
}

const SettingPaper = ({ children }: SettingPaperProp): ReactElement => {
  return (
    <>
      <Paper elevation={8} sx={{
        padding: "20px",
      }}>
        {children}
      </Paper>
    </>
  )
}

export default SettingPaper