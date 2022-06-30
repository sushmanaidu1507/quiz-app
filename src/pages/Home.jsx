import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import AlertMsg from "../components/AlertMsg";
import { useGlobalContext } from "./../context";
import { categories } from "./../data";

const Home = () => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [showError, setShowError] = useState(false);

  const { username, setUsername, fetchQuestions, setQuestions, setScore } =
    useGlobalContext();

  const naviagte = useNavigate();

  /* Create function to handle submittion and check all fields are not empty */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !category || !difficulty) {
      setShowError(true);
    } else {
      setShowError(false);
      fetchQuestions(category, difficulty); // Fetch Questions Data
      naviagte("quiz"); // Go to "Quiz" Page
    }
  };

  /* Create function to empty all fields and state "questions" */
  const resetFields = () => {
    setUsername("");
    setQuestions([]);
    setScore(0);
  };

  /* using useEffect() to run function "resetFields" */
  useEffect(() => {
    resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction={{ xs: "column", md: "row-reverse" }}>
      {/* Banner */}
      <Box
        sx={{
          width: { xs: "85%", md: "55%" },
          p: { xs: "20px 0 0", md: "8px" },
          alignSelf: "center",
        }}
      >
        <img style={{ maxWidth: "100%" }} src="/images/quiz.svg" alt="banner" />
      </Box>
      {/* Settings */}
      <Box
        width={{ xs: "100%", md: "45%" }}
        fontFamily="'Poppins', sans-serif"
        fontWeight="300"
        p="10px"
      >
        {/* Settings Title */}
        <Typography
          variant="h3"
          align="center"
          fontFamily="inherit"
          fontWeight="inherit"
          fontSize={30}
        >
          Quiz Credentials
        </Typography>
        {/* Settings Form */}
        <Stack
          component="form"
          sx={{
            width: "100%",
            padding: "20px",
          }}
          gap="25px"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* Alert Error Message */}
          {showError && (
            <AlertMsg setShowError={setShowError}>
              Please Fill All The Fields
            </AlertMsg>
          )}
          {/* username Input Field */}
          <TextField
            label="Enter Your Name"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!username && showError}
          />
          {/* Categories Dropdown List */}
          <TextField
            variant="outlined"
            select
            label="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={!category && showError}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          {/* Difficulty Dropdown List */}
          <TextField
            variant="outlined"
            select
            label="Select Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            error={!difficulty && showError}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
          {/* Submit Button */}
          <Button variant="contained" size="large" type="submit">
            Start Quiz
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Home;
