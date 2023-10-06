// CourseDetail.js

import React from "react";
import { useParams } from "react-router-dom";

function CourseDetail({ courses }) {
  const { courseId } = useParams();
  const selectedCourse = courses.find((course) => course.id === courseId);

  if (!selectedCourse) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <h2>{selectedCourse.title}</h2>
      <p>{selectedCourse.description}</p>
      {selectedCourse.images.map((image, index) => (
        <img
          src={image}
          alt={`Image ${index + 1}`}
          key={index}
        />
      ))}
      {selectedCourse.videos.map((video, index) => (
        <video
          controls
          src={video}
          alt={`Video ${index + 1}`}
          key={index}
        />
      ))}
    </div>
  );
}

export default CourseDetail;
