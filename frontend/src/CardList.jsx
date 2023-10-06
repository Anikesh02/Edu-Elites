// CardList.js
import React from 'react';
import Card from './Card';

const CardList = ({ cards }) => {
  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card
          key={index}
          imageUrl={card.imageUrl}
          videoUrl={card.videoUrl}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default CardList;
