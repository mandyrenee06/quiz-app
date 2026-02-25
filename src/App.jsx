import { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (questions.length > 0) {
      const answers = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer,
      ].sort(() => Math.random() - 0.5);

      setShuffledAnswers(answers);
     }
  }, [questions, currentQuestion]);

  const decodeHTML = (text) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    const correctAnswer = questions[currentQuestion].correct_answer;

    if (answer === correctAnswer) {
    setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= questions.length - 1) {
      setQuizFinished(true);
    } else {
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
  };
  const fetchQuestions = async (amount, category, difficulty) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );

      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error("No questions available.");
      }

      setQuestions(data.results);

      if (data.results.length < amount) {
        alert(
          `Only ${data.results.length} questions available for this selection.`
        );
      }
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setQuizFinished(false);

      setQuizStarted(true);
    } catch (err) {
      setError("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
   };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {loading && (
        <div className="text-center text-lg font-semibold">
          Loading questions...
        </div>
      )}
      {!quizStarted ? (
        <QuizStart onStart={fetchQuestions} />
      ) : loading ? (
        <div className="text-center text-lg font-semibold">
           Loading questions...
        </div>
      ) : quizFinished ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Finished 🎉</h2>
          <p className="mb-2">
            Your Score: {score} / {questions.length}
          </p>
          <p className="mb-6 font-semibold">
            Percentage: {Math.round((score / questions.length) * 100)}%
          </p>
          <button
            onClick={restartQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
            Quiz Master 🎯
          </h1>

          <p className="text-sm text-gray-500 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h2 className="text-xl font-bold mb-4">
            {decodeHTML(questions[currentQuestion]?.question)}
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
            {shuffledAnswers.map((option, index) => {
              const correctAnswer =
                questions[currentQuestion].correct_answer;

              let buttonStyle =
                "bg-gray-200 hover:bg-indigo-500 hover:text-white";

              if (selectedAnswer !== null) {
                if (option === correctAnswer) {
                  buttonStyle = "bg-green-500 text-white";
                } else if (option === selectedAnswer) {
                  buttonStyle = "bg-red-500 text-white";
                } else {
                  buttonStyle = "bg-gray-200";
                }
              }

              return (
               <button
                 key={index}
                 disabled={selectedAnswer !== null}
                 onClick={() => handleAnswerClick(option)}
                 className={`w-full p-2 rounded-lg ${buttonStyle}`}
               >
                 {decodeHTML(option)}
              </button>
            );
          })}
            
          </div>

          {selectedAnswer && (
            <p className="mt-3 text-center font-semibold">
              {selectedAnswer === questions[currentQuestion].correct_answer
                ? "✅ Correct!"
                : "❌ Wrong!"}
              </p>
             )}
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`w-full py-2 rounded-lg text-white ${
                selectedAnswer === null
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Next
            </button>
        </div>
      )}
    </div>
  );
}

export default App;