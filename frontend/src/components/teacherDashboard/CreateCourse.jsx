import React, { useState } from "react";
import "./CreateCourse.css"; // Import your CSS file for styling

function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImages, setCourseImages] = useState([]);
  const [courseVideos, setCourseVideos] = useState([]);
  const [courses, setCourses] = useState([]); // Array to store multiple courses

  const handleCourseTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleCourseDescriptionChange = (e) => {
    setCourseDescription(e.target.value);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;

    if (files) {
      const imageFiles = [];
      const videoFiles = [];

      // Separate image files and video files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image")) {
          imageFiles.push(file);
        } else if (file.type.startsWith("video")) {
          videoFiles.push(file);
        }
      }

      // Update state with the new image and video files
      setCourseImages([...courseImages, ...imageFiles]);
      setCourseVideos([...courseVideos, ...videoFiles]);
    }
  };

  const handleCourseCreation = () => {
    try {
      if (!courseTitle || !courseDescription) {
        throw new Error("Please fill in all fields.");
      }

      // Create a new course object and add it to the array of courses
      const newCourse = {
        title: courseTitle,
        description: courseDescription,
        images: courseImages.map((file) => URL.createObjectURL(file)),
        videos: courseVideos.map((file) => URL.createObjectURL(file)),
      };

      setCourses([...courses, newCourse]);
      setCourseTitle("");
      setCourseDescription("");
      setCourseImages([]);
      setCourseVideos([]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="create-course-container">
      <h2>Create Course</h2>
      <input
        type="text"
        placeholder="Course Title"
        value={courseTitle}
        onChange={handleCourseTitleChange}
      />
      <textarea
        placeholder="Course Description"
        value={courseDescription}
        onChange={handleCourseDescriptionChange}
      />
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        onChange={handleFileUpload}
      />
      {courseImages.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Images:</h3>
          {courseImages.map((image, index) => (
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index + 1}`}
              key={index}
            />
          ))}
        </div>
      )}
      {courseVideos.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Videos:</h3>
          {courseVideos.map((video, index) => (
            <video
              controls
              src={URL.createObjectURL(video)}
              alt={`Video ${index + 1}`}
              key={index}
            />
          ))}
        </div>
      )}
      <button onClick={handleCourseCreation}>Create</button>

      <div className="courses-container">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-media">
              {course.images.length > 0 && (
                <div className="course-images">
                  {course.images.map((image, imgIndex) => (
                    <img
                      src={image}
                      alt={`Image ${imgIndex + 1}`}
                      key={imgIndex}
                    />
                  ))}
                </div>
              )}
              {course.videos.length > 0 && (
                <div className="course-videos">
                  {course.videos.map((video, vidIndex) => (
                    <video
                      controls
                      src={video}
                      alt={`Video ${vidIndex + 1}`}
                      key={vidIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateCourse;
