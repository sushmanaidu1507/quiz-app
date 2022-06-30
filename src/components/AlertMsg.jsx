import { useEffect } from "react";
import { Alert } from "@mui/material";

const AlertMsg = ({ children, setShowError }) => {

  /* using useEffect() to make a timer for Alert */
  useEffect(() => {
    const alertTimer = setTimeout(() => setShowError(false), 5000);
    return () => {
      clearTimeout(alertTimer)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Alert
      sx={{
        width: "100%",
        justifyContent: "center",
        fontFamily: "inherit",
        fontSize: "1rem",
        fontWeight: "inherit",
      }}
      severity="error"
      variant="filled"
      role="alert"
      icon={false}
    >
      {children}
    </Alert>
  );
};

export default AlertMsg;
