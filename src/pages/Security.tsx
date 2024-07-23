import { Button, Typography } from "@mui/material";
import SettingPaper from "../layouts/SettingPaper";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();

  return (
    <>
      <SettingPaper>
        <Typography component="h2" variant="h4" marginBottom={2}>
          Password
        </Typography>
        <Button variant="contained"
          sx={{
            textTransform: "Capitalize",
          }}
          onClick={() => navigate("/settings/security/change-password")}
        >Change Password</Button>
      </SettingPaper>
    </>
  );
};

export default Security;
