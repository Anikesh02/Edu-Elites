import React, { useState } from "react";
import "./CreateCourse.css"; // Import your CSS file for styling
import { uploadCourse } from '../../firebase';

function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courses, setCourses] = useState([]); // Array to store multiple courses

  const handleCourseTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleCourseDescriptionChange = (e) => {
    setCourseDescription(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Set the courseImage state with the uploaded image data URL
        setCourseImage(e.target.result);
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleCourseCreation = () => {
    try {
      if (!courseTitle || !courseDescription || !courseImage) {
        throw new Error("Please fill in all fields and upload a video.");
      }

      // Create a new course object and add it to the array of courses
      const newCourse = {
        title: courseTitle,
        description: courseDescription,
        image: courseImage,
      };
      uploadCourse(newCourse);

      setCourses([...courses, newCourse]);
      setCourseTitle("");
      setCourseDescription("");
      setCourseImage("");
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
        accept="image/*"
        onChange={handleFileUpload}
      />
      {courseImage && (
        <img src={courseImage} alt="Course Preview" className="course-image" />
      )}
      <button onClick={handleCourseCreation}>Create</button>

      <div className="courses-container">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateCourse;
