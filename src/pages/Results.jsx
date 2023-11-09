import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "../components/Logo";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

const Box = styled.div`
  display: flex;
  margin: auto;
  margin-top: 60px;
  background-color: white;
  border: 2px solid black;
  border-radius: 15px;
  padding: 15px;
  flex-direction: column;
  text-align: center;
  width: 40vw;
  justify-content: center;
  @import url("https://fonts.googleapis.com/css2?family=Inter&family=Source+Code+Pro&display=swap");
  font-family: "Source Code Pro", monospace;

  
`;

function Results() {
  const location = useLocation();
  const score = location.state.score;
  const totalQuestions = location.state.totalQuestions;
  const userAnswers = location.state.userAnswers;
  const questions = location.state.questions;
  const nota = location.state.nota;
  const [resultado, setResultado] = useState();
  useEffect(() => {
    if (nota > 500) {
      setResultado(true);
    }
    if (nota < 500) {
      setResultado(false);
    }
  }, []);

  console.log(score, totalQuestions, userAnswers, questions);
  return (
    <>
      <Header />
      <Box>
        <h3>Resultados da Prova</h3>
        <p>Sua nota foi <span style={{fontWeight:"bold", fontSize:"20px"}}>{nota}</span></p>
        {!resultado && (
            <>
            <div>
            <MdCancel color="red" size="80px"/>
            </div>
          <p>Infelizmente você não atingiu a nota de corte. Tente novamente!</p>
          </>
        )}
        {resultado && (
          <>
            <div>
              <AiFillCheckCircle color="green" size="80px" />
            </div>
            <p>
              Parabéns! Você atingiu a nota de corte e está apto a participar do
              processo seletivo.
            </p>
          </>
        )}
        <p>
          Você acertou {score} de {totalQuestions} perguntas.
        </p>
      </Box>
    </>
  );
}

export default Results;
