import { Alert, Snackbar } from '@mui/material'
import { alertStore } from '../../store/alertStore'

const AlertBox = () => {
  const { alert, setOpen } = alertStore();

  return (
    <Snackbar
      open={alert.open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={alert.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default AlertBox
