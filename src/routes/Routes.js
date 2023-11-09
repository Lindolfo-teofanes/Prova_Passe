import { createBrowserRouter } from "react-router-dom";
import App from '../pages/App';
import QuestionList from "../pages/QuestionList";
import Exam from "../pages/Exam";
import Results from "../pages/Results";


const Controller = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/adicionar", element: <QuestionList /> },
    { path: "/prova", element: <Exam /> },
    { path: "/resultado", element: <Results />},

]);

export default Controller;