function QuizStart() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-96">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Welcome to the Quiz App
      </h2>

      <p className="text-gray-600 mb-6">
        Test your knowledge with fun questions!
      </p>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
        Start Quiz
      </button>
    </div>
  );
}

export default QuizStart;