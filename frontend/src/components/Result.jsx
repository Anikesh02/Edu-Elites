import React from 'react';
import { Pie } from 'react-chartjs-2';

const Result = ({ questions }) => {
  const correctAnswers = questions.filter(
    (question) => question.userAnswer === question.correctAnswer
  ).length;

  const incorrectAnswers = questions.length - correctAnswers;

  const chartData = {
    labels: ['Correct Answers', 'Incorrect Answers'],
    datasets: [
      {
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h2>Test Results</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default Result;
