import { useState } from "react";
import QuizStart from "./components/QuizStart";
import questions from "./data/questions";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!quizStarted ? (
        <QuizStart onStart={startQuiz} />
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="w-full bg-gray-200 hover:bg-indigo-500 hover:text-white p-2 rounded-lg transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;