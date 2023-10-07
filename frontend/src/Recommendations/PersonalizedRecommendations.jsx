import React, { useState } from 'react';
import { useUser } from '../UserContext.jsx';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js'
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;

        getParameters(user.uid).then((data) => {
          updateUser({ uid, name: displayName, photoURL, email, age: data.age, gender: data.gender, role: data.role });
        });
      } else {
        updateUser(null);
      }
    });
    return () => unsubscribe();
  }, [updateUser]);


  const [recommendations, setRecommendations] = useState([]);

  // setLearningType(user?.learningType)
  console.log(user?.learningStyle)

  let ls = "Visual"

  if(user!=null){
    ls = user.learningStyle;
  }  
  const getPersonalizedRecommendations = ({ ls }) => {
    // Filter courses by learning type
    const learningTypeCourses = coursesData.filter((course) => course.learning_type == ls);

    // Dummy calculation for recommendations (you can replace this with your actual logic)
    const recommendedCourses = learningTypeCourses.slice(0, 3); // Just take the first 3 for demonstration

    setRecommendations(recommendedCourses);
  };

  return (
    <div>
      <label>
        Enter your learning type:
        <input
          type="text"
          value={ls}
          onChange={(e) => setLearningType(e.target.value)}
        />
      </label>
      <button onClick={() => getPersonalizedRecommendations(ls)}>
        Get Recommendations
      </button>
      <h2>Personalized Recommendations for {ls} Learner:</h2>
      <ul>
        {recommendations.map((course) => (
          <li key={course.course_id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PersonalizedRecommendations;
