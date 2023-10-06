import React from 'react';


const TestApp = () => {
  return (
    <section>
      <div className="container">
        <h1>Quiz Maker</h1>
        <form id="quiz-form">
          <div className="question">
            <label htmlFor="question-text">Question:</label>
            <input type="text" id="question-text" name="question" required />
          </div>
          <div className="answer-section">
            <label htmlFor="option1">Option 1:</label>
            <input type="text" id="option1" name="options" required />
            <label htmlFor="option2">Option 2:</label>
            <input type="text" id="option2" name="options" required />
            <label htmlFor="option3">Option 3:</label>
            <input type="text" id="option3" name="options" required />
            <label htmlFor="option4">Option 4:</label>
            <input type="text" id="option4" name="options" required />
          </div>
          <div className="correct-answer">
            <label htmlFor="correct-answer">Correct Answer:</label>
            <select id="correct-answer" name="correct-answer" required>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <div className="difficulty-level">
            <label htmlFor="difficulty">Difficulty Level:</label>
            <select id="difficulty" name="difficulty" required>
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button type="submit">Add Question</button>
        </form>
      </div>
      <div id="quiz-preview">
        <h2>Quiz Preview</h2>
      </div>
    </section>
  );
}

export default TestApp;
