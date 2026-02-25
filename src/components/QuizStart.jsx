import { useState } from "react";

function QuizStart({ onStart }) {
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState(9); // General Knowledge default
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    onStart(amount, category, difficulty);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">
        Quiz Master 🎯
      </h1>

      {/* Number of Questions */}
      <div className="mb-4 text-left">
        <label className="block mb-1 font-medium">
          Number of Questions
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Category */}
      <div className="mb-4 text-left">
        <label className="block mb-1 font-medium">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="9">General Knowledge</option>
          <option value="17">Science & Nature</option>
          <option value="23">History</option>
          <option value="11">Entertainment</option>
        </select>
      </div>

      {/* Difficulty */}
      <div className="mb-6 text-left">
        <label className="block mb-1 font-medium">
          Difficulty
        </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        onClick={handleStart}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default QuizStart;