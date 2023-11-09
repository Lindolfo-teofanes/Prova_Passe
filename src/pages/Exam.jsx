import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Logo";

const Box = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 2%;
  background-color: white;
  border: 2px solid black;
  border-radius: 15px;
  padding: 5px;
  flex-direction: column;
  text-align: center;
  width: 40vw;
  @import url("https://fonts.googleapis.com/css2?family=Inter&family=Source+Code+Pro&display=swap");
  font-family: "Source Code Pro", monospace;

  p {
    text-align: justify;
  }

  .pergunta{
    display: flex;
  }

  button {
    margin: auto;
    width: 20%;
    height: 5vh;
    background-color: #f8f8f9;
    border: none;
    border-radius: 30px;
    color: black;
    font-weight: bold;
    border-style: dotted;
    cursor: pointer;

    &:hover {
      background-color: #4361ee;
      color: white;
    }
  }
`;
const Time = styled.div`
  margin: auto;
  display: flex;
  width: 40vw;
  justify-content: end;
`;

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: start;
`;

const Text = styled.div`
  margin: auto;
  margin-bottom: 10px;
  text-align: left;

  i{
    display: block;
    margin: 0 auto;
    text-align: center;
  }
`;

const EXAM_DURATION = 5 * 60 * 60 * 1000;

function Exam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [remainingExamTime, setRemainingExamTime] = useState(EXAM_DURATION);
  const userAnswers = useRef([]);
  const location = useLocation();
  const questions = location.state.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const navigate = useNavigate();

  const handleAnswerSubmit = () => {
    console.log("currentQuestionIndex:", currentQuestionIndex, "questions.length:", questions.length);
    if (currentQuestionIndex < questions.length - 1) {
      // Atualize userAnswers após cada seleção de resposta
      console.log("selectedOption:", selectedOption);
      userAnswers.current.push(selectedOption);
      console.log("userAnswers:", userAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    } else {
       
      userAnswers.current.push(selectedOption);
      console.log("userAnswers:", userAnswers.length);
    const totalQuestions = questions.length;
    const score = questions.reduce((accumulator, question, index) => {
        if (question.answer === userAnswers.current[index]) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);
    const valorPergunta = 1000/totalQuestions;
    const nota = (valorPergunta*score);

    navigate("/resultado", {
        state: { score:score, totalQuestions:totalQuestions, userAnswers:userAnswers.current, questions:questions, nota },
      });
      
    }
  };

  function redirect() {
    console.log("userAnswers:", userAnswers.length);
    const totalQuestions = questions.length;
    const score = questions.reduce((accumulator, question, index) => {
        if (question.answer === userAnswers[index]) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);

    navigate("/resultado", {
        state: { score, totalQuestions, userAnswers, questions },
      });
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingExamTime(remainingExamTime - 1000);
    }, 1000);

    // Return a function to stop the timer when the component unmounts
    return () => clearInterval(timer);
  }, [remainingExamTime]);
  useEffect(() => {
    setSelectedOption("");
  }, [currentQuestion]);

  const hours = Math.floor(remainingExamTime / (60 * 60 * 1000));
  const minutes = Math.floor((remainingExamTime / (60 * 1000)) % 60);
  const seconds = Math.floor((remainingExamTime / 1000) % 60);
  const optionsLabels = ["A", "B", "C", "D", "E"];
  return (
    <>
      <Header />
      <Time>
        <p>
          Tempo Restante: {hours}:{minutes}:{seconds}
        </p>
      </Time>
      <Box>
        <div style={{ padding: "10px" }}>
        {currentQuestion.text && (<Text><p>Leia o texto a seguir para responder a questão {currentQuestionIndex + 1}:</p> <br /><i><div dangerouslySetInnerHTML={{__html: currentQuestion.text}}/></i></Text>)}
          <p className="pergunta">
            <b>{currentQuestionIndex + 1}-</b> <div dangerouslySetInnerHTML={{__html: currentQuestion.question}}/>
          </p>
          {currentQuestion.image && (
            <img src={currentQuestion.image} alt="Imagem da pergunta" />
          )}
          <Questions>
            {currentQuestion.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                {optionsLabels[index]}. {option}
              </label>
            ))}
          </Questions>
        </div>
        <div>
          <button style={{ marginRight: "10px" }} onClick={handleAnswerSubmit}>
            {currentQuestionIndex < questions.length - 1
              ? "Próxima"
              : "Terminar"}
          </button>
          <button onClick={() => navigate("/")}>Voltar ao Home</button>
        </div>
      </Box>
    </>
  );
}

export default Exam;
