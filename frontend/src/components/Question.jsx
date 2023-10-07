import React from 'react';

const Question = ({ question, onAnswerSelected }) => {
  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option) => (
          <li key={option}>
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => onAnswerSelected(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
