import styled from "styled-components";
import Header from "../components/Logo";
import { useNavigate } from "react-router-dom";
import questions_passe from "../data/questions_passe.json";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  justify-content: center;
  @import url("https://fonts.googleapis.com/css2?family=Inter&family=Source+Code+Pro&display=swap");
  font-family: "Source Code Pro", monospace;
`;

const Botao = styled.button`
  width: 7vw;
  height: 5vh;
  margin: auto;
  background-color: #f8f8f9;
  border: none;
  border-radius: 30px;  
  border-style: dotted;
  font-weight: bold;
  color: black;
  cursor: pointer;
  &:hover{
            background-color: #4361ee;
            color: white;
        }
`;

const Container = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-color: white;
  margin: auto;
  margin-top: 60px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  width: 30vw;
  h4 {
    text-align: start;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 6vw;
    img {
        width: 100%;
      border-radius: 10px;
    }
    /* p{
        text-align: center;
    } */
  }
`;

function App() {
  const navigate = useNavigate();
  function redirect(page) {
    if (page === "QuestionList") navigate("/Adicionar");
    if (page === "passe") navigate("/prova", { state: { questions: questions_passe } });
  }
  return (
    <>
      <Header />
      <Box>
        <h1>Seja bem-vindo ao Lindolfo Teófanes Cursos</h1>
        <p>Esse é o nosso simulador de provas</p>
        <Botao
          onClick={() => {
            redirect("QuestionList");
          }}
        >
          Criar nova Prova
        </Botao>
        <Container>
          <h4>Provas existente:</h4>
          <button onClick={()=>redirect("passe")}>
            <img src="https://faalc.ufms.br/files/2022/11/ufms.jpg" alt="" />
            <p>PASSE - TRIÊNIO 2020-2022 – 2ª ETAPA</p>
          </button>
        </Container>
      </Box>
    </>
  );
}

export default App;
