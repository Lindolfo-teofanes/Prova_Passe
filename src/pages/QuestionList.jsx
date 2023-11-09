import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Logo";

const Box = styled.div`
  display: flex;
  margin: auto;
  margin-top: 60px;
  background-color: white;
  border: 2px solid black;
  border-radius: 15px;
  padding: 5px;
  flex-direction: column;
  text-align: center;
  width: 40vw;
  justify-content: center;
  @import url("https://fonts.googleapis.com/css2?family=Inter&family=Source+Code+Pro&display=swap");
  font-family: "Source Code Pro", monospace;

  ol{
        text-align: start;
  }
`;

const Pergunta = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 20px;
  text-align: start;
  width: 75%;
  input {
    height: 2.8vh;
    max-height: 100vh;
    max-width: 100%;
    white-space: pre;
  }
`;

const Botoes = styled.div`
    display: flex;
    margin: auto;
    margin-bottom: 20px;
    width: 80%;
    justify-content: space-around;
    button{
        width: 20%;
        height: 5vh;
        background-color: #f8f8f9;
        border: none;
        border-radius: 30px;
        color: black;
        font-weight: bold;
        border-style: dotted;
        cursor: pointer;

        &:hover{
            background-color: #4361ee;
            color: white;
        }
    }

`;

const Questoes = styled.div`
    display: flex;
    margin: auto;
    margin-bottom: 20px;
    width: 50%;
    
`;

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", "", ""]);
  const [newAnswer, setNewAnswer] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newText, setNewText] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(savedQuestions);
  }, []);

  const addQuestion = () => {
    const updatedQuestions = [
      ...questions,
      {
        text: newText,
        question: newQuestion,
        options: newOptions,
        answer: newAnswer,
        image: newImage,
      },
    ];
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    // Limpar campos do formulário
    setNewText("");
    setNewQuestion("");
    setNewOptions(["", "", "", "",""]);
    setNewAnswer("");
    setNewImage("");

    // Limpar campos de resposta
    //onQuestionsAdded(updatedQuestions);
  };

  const exportQuestionsToJson = () => {
    const json = JSON.stringify(questions, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "questions.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <Box>
        <h2>Adicionar Perguntas</h2>
        <Pergunta>
          <label>Adicione o texto caso exista: </label>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </Pergunta>
        <Pergunta>
          <label>Pergunta:</label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </Pergunta>
        <Pergunta>
          <label>Opções:</label>
          {newOptions.map((option, index) => (
            <input
            style={{marginBottom: "5px"}}
              type="text"
              key={index}
              placeholder={`Opção ${index + 1}`}
              value={option}
              onChange={(e) => {
                const updatedOptions = [...newOptions];
                updatedOptions[index] = e.target.value;
                setNewOptions(updatedOptions);
              }}
            />
          ))}
        </Pergunta>
        <Pergunta>
          <label>Imagem: </label>
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
        </Pergunta>
        <Pergunta>
          <label>Resposta Correta:</label>
          <select
            style={{ height: "2.8vh", maxHeight: "100vh", maxWidth: "100%" }}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          >
            {newOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Pergunta>
        <Botoes>

        <button onClick={addQuestion}>Adicionar Pergunta</button>
        <button onClick={exportQuestionsToJson}>Exportar JSON</button>
        <button onClick={()=>{localStorage.clear(); window.location.reload()}}>Limpar tudo</button>
        <button onClick={()=>navigate("/")}>Voltar</button>
        </Botoes>
      </Box>
      <Box>
        <p><b>Perguntas Criadas</b></p>
      <ol>
        {questions.map((q, index) => (
          <li key={index}>{q.question}</li>
        ))}
      </ol>
      </Box>
    </>
  );
}

export default QuestionList;
