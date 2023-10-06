// Card.js
import React from 'react';

const Card = ({ imageUrl, videoUrl, title, description }) => {
  return (
    <div className="card">
      {/* Display the image or video */}
      {imageUrl && <img src={imageUrl} alt={title} />}
      {videoUrl && (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Display title and description */}
      <div className="card-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
