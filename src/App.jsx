import { useState } from "react";
import QuizStart from "./components/QuizStart";
import questions from "./data/questions";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);

    if (option === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!quizStarted ? (
        <QuizStart onStart={startQuiz} />
      ) : quizFinished ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Finished 🎉</h2>
          <p className="mb-6">
            Your Score: {score} / {questions.length}
          </p>
          <button
            onClick={restartQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <p className="text-sm text-gray-500 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h2 className="text-xl font-bold mb-4">
            {questions[currentQuestion].question}
          </h2>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
           className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
           style={{
             width: `${((currentQuestion + 1) / questions.length) * 100}%`,
           }}
         ></div>
        </div>
          <div className="space-y-3 mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswerClick(option)}
                className={`w-full p-2 rounded-lg transition ${
                selectedAnswer
                   ? option === questions[currentQuestion].answer
                     ? "bg-green-500 text-white"
                     : option === selectedAnswer
                     ? "bg-red-500 text-white"
                     : "bg-gray-200"
                   : "bg-gray-200 hover:bg-indigo-500 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <button
              onClick={handleNext}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;