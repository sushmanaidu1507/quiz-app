import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, styled } from "@mui/material";
import AlertMsg from "./AlertMsg";

/* Create Styled Component for button */
const StyledButton = styled("button")`
  width: 46%;
  height: 50px;
  padding: 15px 20px;
  font-size: 14px;
  box-shadow: 0 0 2px #000;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 650px) {
    width: 100%;
  }
  &.correct,
  &.wrong {
    color: white;
    box-shadow: none;
  }
  &.correct {
    background-color: #07cf00;
  }
  &.wrong {
    background-color: #e90000;
  }
`;

const Question = ({
  currentIndex,
  setCurrentIndex,
  setScore,
  questions,
  question,
  correct_answer,
  incorrect_answers,
}) => {
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  /* Create function to shuffle Array Elements using "sort()" Method */
  const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  /* using useEffect() to create Shuffled Array of Choices when state "CurrentIndex" changes */
  useEffect(() => {
    setChoices(shuffleArray([correct_answer, ...incorrect_answers]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  /* Create a function to handle select when user selects a choice */
  const handleSelect = (c) => {
    setSelectedChoice(c);
    setShowError(false);
    /* Check if choice equal to correct answer, to increase Total by one */
    if (c === correct_answer) setScore((prevScore) => prevScore + 1);
  };

  /* Create a function to handle when user clicks on "Next Question" button */
  const handleNextQuestion = () => {
    if (selectedChoice) {
      // Check if user selects a choice
      setSelectedChoice("");
      if (currentIndex < questions.length - 1) {
        // Check if it's not the last question
        setCurrentIndex(currentIndex + 1);
      } else {
        navigate("/result", { replace: true }); // Go to "Result" Page
      }
    } else {
      setShowError(true);
    }
  };

  /* Create a function to add Classes "correct" & "wrong" when user selects a choice */
  const addChoicesClasses = (c) => {
    /* if choice is selected and correct, add class "correct" */
    if (c === selectedChoice && c === correct_answer) return "correct";
    /* if choice is selected and not correct, add class "wrong" */
    else if (c === selectedChoice && c !== correct_answer) return "wrong";
    /* if choice is not selected and correct, add class "correct" */
    else if (c !== selectedChoice && c === correct_answer) return "correct";
  };

  return (
    <Stack width="100%" alignItems="center">
      {/* Question Number */}
      <Typography variant="h4" fontFamily="inherit" fontWeight={700} mb="10px">
        Question {currentIndex + 1} :
      </Typography>
      {/* Question Content */}
      <Stack width="95%" p="20px" border="5px solid grey" alignItems="center">
        {/* Question Title */}
        <Typography
          variant="h5"
          fontFamily="inherit"
          fontWeight={700}
          mb="10px"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        {/* Alert Error Message */}
        {showError && (
          <AlertMsg setShowError={setShowError}>
            Please Make A Choice First
          </AlertMsg>
        )}
        {/* Question Choices */}
        <Stack
          width="100%"
          direction="row"
          flexWrap="wrap"
          justifyContent="space-around"
          gap="20px"
          m="10px 0 20px"
        >
          {choices.length !== 0 &&
            choices.map((choice, index) => {
              return (
                <StyledButton
                  key={index}
                  className={selectedChoice && addChoicesClasses(choice)}
                  onClick={() => handleSelect(choice)}
                  disabled={selectedChoice} // disabled when user selects a choice
                  dangerouslySetInnerHTML={{ __html: choice }}
                />
              );
            })}
        </Stack>
        {/* Question Controls */}
        <Stack width="100%" direction="row" justifyContent="space-around">
          {/* Quit Button */}
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => navigate("/", { replace: true })}
          >
            Quit
          </Button>
          {/* Next Question Button */}
          <Button variant="contained" size="large" onClick={handleNextQuestion}>
            Next Question
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Question;
