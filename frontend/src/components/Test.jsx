import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';

const Test = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      userAnswer: null,
    },
    // Add more questions here
  ]);

  const [showResult, setShowResult] = useState(false);

  const handleAnswerSubmit = () => {
    // Calculate the score and store user answers
    // Show the results
    setShowResult(true);
  };

  return (
    <div>
      {showResult ? (
        <Result questions={questions} />
      ) : (
        <>
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onAnswerSelected={(selectedOption) => {
                // Update user's answer
              }}
            />
          ))}
          <button onClick={handleAnswerSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default Test;
