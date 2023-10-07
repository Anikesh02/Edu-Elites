import React, { useState } from 'react';

// Define initial parameters for multiple skills (questions in the quiz)
const numQuestions = 3;
const PL0 = [0.4];
const PT = [0.3];
const PS = [0.1];

// Define the quiz questions and correct answers
const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which programming language is known for its readability?',
    options: ['Python', 'Java', 'C++', 'JavaScript'],
    correctAnswer: 'Python',
  },
  {
    question: 'How many planets are there in our solar system?',
    options: ['7', '8', '9', '10'],
    correctAnswer: '8',
  },
];

function CourseTest() {
  const [userResponses, setUserResponses] = useState([]);
  const [knowledgeStates, setKnowledgeStates] = useState(
    Array(numQuestions).fill(PL0[0])
  );

  const handleQuizSubmit = () => {
    let newKnowledgeStates = [...knowledgeStates];
    for (let i = 0; i < userResponses.length; i++) {
      const response = userResponses[i];
      // Calculate the posterior probabilities using Bayes' theorem
      const PL1 =
        (PT[0] * knowledgeStates[i]) /
        (PT[0] * knowledgeStates[i] + (1 - PS[0]) * (1 - knowledgeStates[i]));
      const PL0 =
        ((1 - PT[0]) * knowledgeStates[i]) /
        ((1 - PT[0]) * knowledgeStates[i] + PS[0] * (1 - knowledgeStates[i]));

      // Update the knowledge state for the current question
      newKnowledgeStates[i] = response === 1 ? PL1 : PL0;
    }

    // Update knowledgeStates with the new values
    setKnowledgeStates(newKnowledgeStates);
  };

  return (
    <div className="App">
      <h1 className='heading mb-5'>Welcome to the App Development Quiz!</h1>
      {quizQuestions.map((question, index) => (
        <div key={index}>
          <h3 className='text-[22px] mb-5'>Question {index + 1}: {question.question}</h3>
          {question.options.map((option, optionIndex) => (
            <div className='mb-5' key={optionIndex}>
              <input
                type="radio"
                name={`question${index}`}
                id={`option${optionIndex}`}
                value={option}
                onChange={(e) => {
                  
                  const newUserResponses = [...userResponses];
                  newUserResponses[index] =
                    option === question.correctAnswer ? 1 : 0;
                  setUserResponses(newUserResponses);
                }}
              />
              <label className='ml-3 text-[16px]' htmlFor={`option${optionIndex}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button className='btn mb-5' onClick={handleQuizSubmit}>Submit Quiz</button>
      {/* {knowledgeStates.map((knowledgeState, index) => (
        <p key={index}>
          Question {index + 1} Knowledge State: {knowledgeState}
        </p>
      ))} */}
      {knowledgeStates.map((knowledgeState, index) => {
        if (knowledgeState <= 0.2) {
          return (
            <p className='mb-5 text-[22px]' key={index}>You have mastered Question {index + 1}</p>
          );
        } else if (knowledgeState >= 0.8) {
          return (
            <p className='mb-5' key={index}>You need more practice with Question {index + 1}</p>
          );
        } else {
          return (
            <p className='mb-5' key={index}>You are making progress with Question {index + 1}</p>
          );
        }
      })}
    </div>
  );
}

export default CourseTest;
