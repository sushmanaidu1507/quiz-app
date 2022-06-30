import { Stack, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Result = () => {
  const { username, score } = useGlobalContext();

  const navigate = useNavigate();

  /* using useEffect() to check if user logged in */
  useEffect(() => {
    if (!username) {
      navigate("/", { replace: true });
    }
  }, [username, navigate]);

  return (
    <Stack height="60vh" justifyContent="center" alignItems="center">
      {/* Total Score */}
      <Typography
        variant="h2"
        fontFamily="'Montserrat',sans-serif"
        fontSize="8vw"
        textTransform="uppercase"
        mb="20px"
      >
        Final Score : {score}
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

export default Result;
