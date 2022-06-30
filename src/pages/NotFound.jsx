import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack height="60vh" justifyContent="center" alignItems="center">
      {/* Not Found Msg */}
      <Typography
        variant="h2"
        fontFamily="'Montserrat',sans-serif"
        fontSize="7vw"
        textTransform="uppercase"
        mb="20px"
      >
        Not Found Page
      </Typography>
      {/* Go back Button */}
      <Button
        variant="contained"
        size="large"
        color="error"
        onClick={() => navigate("/", { replace: true })}
      >
        Go to Homepage
      </Button>
    </Stack>
  );
};

export default NotFound;
