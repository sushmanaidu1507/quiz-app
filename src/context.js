import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  /* Create a function that accepts two params "cate" & "diffi" to fetch data */
  const fetchQuestions = (cate, diffi) => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${cate}&difficulty=${diffi}&type=multiple`
      )
      .then((res) => {
        // console.log(res.data.results); // debug
        setQuestions(res.data.results);
      })
      .catch((err) => console.log(err.message)); // debug
  };

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        fetchQuestions,
        questions,
        setQuestions,
        score,
        setScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
