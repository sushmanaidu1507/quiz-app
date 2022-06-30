import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Stack, Typography } from "@mui/material";
import Question from "../components/Question";
import { useGlobalContext } from "../context";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const { username, questions, score, setScore } = useGlobalContext();

  /* using useEffect() to check if user logged in */
  useEffect(() => {
    if (!username) {
      navigate("/", { replace: true });
    }
  }, [username, navigate]);

  return (
    <Stack
      alignItems="center"
      fontFamily="'Poppins', sans-serif"
      fontWeight={300}
    >
      {/* Quiz Subtitle */}
      <Typography
        variant="h3"
        fontWeight="inherit"
        sx={{
          p: "5px 10px",
          fontSize: "25px",
          border: "1px solid black",
          boxShadow: "4px 4px 2px black",
        }}
      >
        Welcome, {username}
      </Typography>
      {questions.length !== 0 ? (
        <>
          {/* Quiz Info */}
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            textTransform="uppercase"
            m="10px"
          >
            {/* Question Category */}
            <Typography fontWeight="inherit">
              {questions[currentIndex].category}
            </Typography>
            {/* Total Score */}
            <Typography fontWeight="inherit">Score : {score}</Typography>
          </Stack>
          {/* Single Question Data */}
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setScore={setScore}
            questions={questions}
            {...questions[currentIndex]}
          />
        </>
      ) : (
        /* Circular Loading */
        <CircularProgress sx={{ m: "100px" }} size={150} thickness={1.2} />
      )}
    </Stack>
  );
};

export default Quiz;
