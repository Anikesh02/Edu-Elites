import React, { useState, useCallback } from 'react';
import { useUser } from '../UserContext.jsx';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getParameters } from '../firebase.js'
// Sample course data (replace this with your actual data)


const coursesData = [
  {
    course_id: 1,
    title: 'Introduction to Web development(auditory)',
    description: 'Course on web development techniques.',
    learning_type: 'auditory',
  },
  {
    course_id: 2,
    title: 'Figma design tutorial(visual)',
    description: 'Learn the basics of figma design.',
    learning_type: 'visual',
  },
  {
    course_id: 3,
    title: 'Machine Learning Workshop(theory)',
    description: 'Theory and basics of machine learning.',
    learning_type: 'written',
  },
  {
    course_id: 4,
    title: 'Advanced data visualization Concepts(visual)',
    description: 'Advanced data visual concepts and techniques.',
    learning_type: 'visual',
  },
  {
    course_id: 5,
    title: 'Communication Strategies(auditory)',
    description: 'Strategies for effective communication.',
    learning_type: 'auditory',
  },
];

function PersonalizedRecommendations() {
  const { user, updateUser } = useUser();
  const [ls, setLearningStyle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const learningTypeCourses = [];


  const getPersonalizedRecommendations = (learningType) => {
    // Filter courses by learning type
    console.log(learningType);

    for (const course of coursesData) {
      if (course.learning_type.toLowerCase() == learningType.toLowerCase()) {
        learningTypeCourses.push(course);
      }
    }
  
    // Take the first 3 matching courses for recommendations
    const recommendedCourses = learningTypeCourses.slice(0, 3);

    setRecommendations(recommendedCourses);
  }
  console.log(recommendations);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;

        getParameters(user.uid).then((data) => {
          updateUser({ uid, name: displayName, photoURL, email, age: data.age, gender: data.gender, role: data.role, learningStyle: data.learningStyle });
          setLearningStyle(data.learningStyle);
        });
      } else {
        updateUser(null);
      }
    });
    return () => unsubscribe();
  }, [updateUser]);


  return (
    <div className='container w-[600px]'>
      <h2 className='mb-5 text-center text-[22px]'>Personalized Recommendations for {ls} Learner:</h2>
      <button className='btn mb-5' onClick={() => getPersonalizedRecommendations(ls)}>
        Get Recommendations
      </button>
      <ul>
        {
          recommendations.map((course) => (
            <li className='text-center text-[16px] mb-5' key={course.course_id}>{course.title}</li>
          ))}
      </ul>
    </div>
  );
}


export default PersonalizedRecommendations;
