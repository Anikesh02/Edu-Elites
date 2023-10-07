// App.js
import React, { useState } from 'react';
import UploadForm from './UploadForm';
import CardList from './CardList';

function CardApp() {
  const [cards, setCards] = useState([]);

  // Function to add a new card to the list
  const addCard = (imageUrl, videoUrl) => {
    setCards([...cards, { imageUrl, videoUrl }]);
  };

  return (
    <div className="App">
      
      <UploadForm addCard={addCard} />
      <CardList cards={cards} />
    </div>
  );
}

export default CardApp;
