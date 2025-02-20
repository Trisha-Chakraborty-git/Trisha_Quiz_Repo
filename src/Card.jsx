import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language runs in the browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      answer: "Tokyo",
    },
    {
      question: "What is 5 + 3?",
      options: ["5", "8", "12", "7"],
      answer: "8",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      answer: "William Shakespeare",
    },
    {
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "120°C", "80°C"],
      answer: "100°C",
    },
    {
      question: "Which gas do plants absorb?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide",
    }
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && !showFeedback) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showFeedback]);

  const handleSubmit = () => {
    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4 text-gray-900 w-full">
      <header className="text-3xl font-bold mb-6">Quiz Challenge 🎯</header>
      {showResult && score > 1 && <Confetti />}
      <motion.div 
        className="bg-gradient-to-r from-white to-blue-50 text-black p-6 rounded-lg shadow-xl w-full max-w-md text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!showFeedback && <div className="absolute top-2 right-4 text-gray-600 font-bold text-lg">⏳ {timeLeft}s</div>}
        {showResult ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg font-semibold">Your score: {score} / {questions.length}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleRestartQuiz}>Restart Quiz</button>
          </div>
        ) : showFeedback ? (
          <div>
            <h2 className="text-xl font-bold">{selectedAnswer === questions[currentQuestion].answer ? "✅ Correct!" : "❌ Wrong!"}</h2>
            <p className="mt-2">The correct answer is: <span className="font-bold">{questions[currentQuestion].answer}</span></p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={handleNextQuestion}>Next Question</button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  className={`p-3 rounded-lg border ${selectedAnswer === option ? 'bg-gray-300' : 'bg-gray-200 hover:bg-blue-100'} text-black transition-shadow shadow-sm hover:shadow-md`} 
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSubmit} disabled={!selectedAnswer}>Submit</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
