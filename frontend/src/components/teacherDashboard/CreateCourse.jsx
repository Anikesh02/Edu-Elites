import React, { useState } from "react";
import "./CreateCourse.css"; // Import your CSS file for styling


import { uploadCourse } from '../../firebase';

function CreateCourse() {
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseImages, setCourseImages] = useState([]);
    const [courseVideos, setCourseVideos] = useState([]);
    const [courses, setCourses] = useState([]); // Array to store multiple courses
    const [quizData, setQuizData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_ans: '',
        difficulty: ''
    })


    const handleCourseTitleChange = (e) => {
        setCourseTitle(e.target.value);
    };

    const handleCourseDescriptionChange = (e) => {
        setCourseDescription(e.target.value);
    };

    const handleInputChange = (e) => {
        setQuizData({ ...quizData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setQuizData(quizData);
    };

    const handleFileUpload = (e) => {
        const files = e.target.files[0];
        setCourseImages(files);
        console.log(files);


        
    };
    const handleFileUpload2 = (e) => {
        const files = e.target.files[0];
        setCourseVideos(files);
        console.log(files);


        
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
                images: courseImages,
                videos: courseVideos,
                quiz: {
                    questions: quizData, // Add quiz questions here
                    // Add other quiz-related properties as needed
                },
            };
            console.log(newCourse);

            // You can add quiz questions to the newCourse.quiz.questions array based on your logic

            uploadCourse(newCourse).then(() => {
                console.log("Course uploaded successfully");
            });


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
        <div>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
                
                    <div>
                        <input
                            type="text"
                            placeholder="Course Title"
                            className="w-full border rounded-md p-2 mb-4"
                            value={courseTitle}
                            onChange={handleCourseTitleChange}
                        />
                        
                        <div className="LearningStyle">
                        <label htmlFor="Learningstyle" >Learning Style:</label>
                        <select id="Learningstyle" name="LearningStyle" required onChange={handleInputChange} >
                            <option value="Auditory">Auditory</option>
                            <option value="Visual">Visual</option>
                            <option value="Written">Written</option>
                        </select>
                        
                            {/* type="text"
                            placeholder="Learning Style"
                            className="w-full border rounded-md p-2 mb-4"
                            value={courseTitle}
                            onChange={handleCourseTitleChange} */}
                        
                        </div>
                        <textarea
                            placeholder="Course Description"
                            className="w-full border rounded-md p-2"
                            value={courseDescription}
                            onChange={handleCourseDescriptionChange}
                        />
                        <p9>*Add Thumbnail and Video</p9><br></br>
                        <input
                            type="file"
                            accept="image/*, video/*"
                            multiple
                            className="mt-4"
                            onChange={handleFileUpload}
                        />
                        <input
                            type="file"
                            accept="image/*, video/*"
                            multiple
                            className="mt-4"
                            onChange={handleFileUpload2}
                        />
                        
                    </div>

                

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {courses.map((course, index) => (
                        <div className="bg-white rounded-lg p-4 border border-gray-200" key={index}>
                            <div className="flex space-x-4">
                                <div className="flex-shrink-0">
                                    {course.images.length > 0 && (
                                        <img
                                            src={course.images[0]} 
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
                               
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section>
                <div className="container">
                    <h1>Quiz Maker</h1>
                    <form id="quiz-form" onSubmit={submitHandler}>
                        <div className="question">
                            <label htmlFor="question-text">Question:</label>
                            <input type="text" id="question-text" name="question" required onChange={handleInputChange} />
                        </div>
                        <div className="answer-section">
                            <label htmlFor="option1">Option 1:</label>
                            <input type="text" id="option1" name="options" required onChange={handleInputChange} />
                            <label htmlFor="option2">Option 2:</label>
                            <input type="text" id="option2" name="options" required onChange={handleInputChange} />
                            <label htmlFor="option3">Option 3:</label>
                            <input type="text" id="option3" name="options" required onChange={handleInputChange} />
                            <label htmlFor="option4">Option 4:</label>
                            <input type="text" id="option4" name="options" required onChange={handleInputChange} />
                        </div>
                        <div className="correct-answer">
                            <label htmlFor="correct-answer">Correct Answer:</label>
                            <select id="correct-answer" name="correct-answer" required onChange={handleInputChange}>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                                <option value="option4">Option 4</option>
                            </select>
                        </div>
                        <div className="difficulty-level">
                            <label htmlFor="difficulty" >Difficulty Level:</label>
                            <select id="difficulty" name="difficulty" required onChange={handleInputChange} >
                                <option value="easy">Easy</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <button type="submit">Done</button>
                        <button>Add Question</button>
                    </form>
                </div>


            </section>
            <div className="space-y-4">
                <button
                    onClick={handleCourseCreation}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                > Create
                </button>
                {/* Add other elements or details on the right side */}
            </div>
            <section>

            </section>
        </div>

    );
}



export default CreateCourse;
