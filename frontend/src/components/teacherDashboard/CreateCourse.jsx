import React, { useState } from "react";
import "./CreateCourse.css"; // Import your CSS file for styling


import { uploadCourse } from '../../firebase';

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
      uploadCourse(newCourse);

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
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Course Title"
                        className="w-full border rounded-md p-2 mb-4"
                        value={courseTitle}
                        onChange={handleCourseTitleChange}
                    />
                    <textarea
                        placeholder="Course Description"
                        className="w-full border rounded-md p-2"
                        value={courseDescription}
                        onChange={handleCourseDescriptionChange}
                    />
                    <input
                        type="file"
                        accept="image/*, video/*"
                        multiple
                        className="mt-4"
                        onChange={handleFileUpload}
                    />
                    <div className="mt-2">
                        {courseImages.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Uploaded Images:</h3>
                                <div className="flex flex-wrap mt-2">
                                    {courseImages.map((image,video, index) => (
                                        <img
                                            src={URL.createObjectURL(image,video)}
                                            alt={`Image ${index + 1}`}
                                            className="w-24 h-24 rounded-md mr-2 mb-2"
                                            key={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {courseVideos.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Uploaded Videos:</h3>
                                <div className="flex flex-wrap mt-2">
                                    {courseVideos.map((video, index) => (
                                        <video
                                            controls
                                            src={URL.createObjectURL(video)}
                                            alt={`Video ${index + 1}`}
                                            className="w-24 h-24 rounded-md mr-2 mb-2"
                                            key={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-4">
                    <button
                        onClick={handleCourseCreation}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    > Create
                    </button>
                    {/* Add other elements or details on the right side */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {courses.map((course, index) => (
                    <div className="bg-white rounded-lg p-4 border border-gray-200" key={index}>
                        <div className="flex space-x-4">
                            <div className="flex-shrink-0">
                                {course.images.length > 0 && (
                                    <img
                                        src={course.images[0]} // Display the first uploaded image
                                        alt={`Image ${index + 1}`}
                                        className="w-20 h-20 rounded-md"
                                    />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold">{course.title}</h3>
                                <p className="text-gray-600">{course.description}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            {/* Add additional course details or media here */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateCourse;
