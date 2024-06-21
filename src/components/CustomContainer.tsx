import { Container } from '@mui/material'
import { images } from '../utils/image'

type childrenProps = {
  children: any
  sx?: any
}

const CustomContainer: React.FC<childrenProps> = ({ children, sx }) => {
  return (
    <div>
      <Container
        component="section"
        maxWidth={false}
        disableGutters
        sx={{
          padding: {
            xs: "30px",
            sm: "0px",
          },
          height: '100vh',

          background: `url(${images.background}) no-repeat fixed center`,
          backgroundSize: "cover",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          ".MuiContainer-root": {
            padding: 0,
            margin: 0,
          },
          ...sx
        }}>
        {children}
      </Container>
    </div>
  )
}

export default CustomContainer
