import React from 'react'
import { useUser } from '../UserContext.jsx';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getParameters } from '../firebase.js';
import axios from 'axios';



const ProgressReport = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <div className='heading ml-[50px]'>Progress Report:</div>


      </div>
    </div>
  );
}
const StudentDetails = () => {

  const { user, updateUser } = useUser();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;

        getParameters(user.uid).then((data) => {
          updateUser({ uid, name: displayName, photoURL, email, age: data.age, gender: data.gender, role: data.role, learningStyle: data.learningStyle });
        });
      } else {
        updateUser(null);
      }
    });
    return () => unsubscribe();
  }, [updateUser]);


  return (
    <div className='flex flex-col'>
      <div className='heading ml-[50px] mb-9'>Hello, {user?.name}.</div>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <p className='ml-[50px] text-[28px]'>Email: {user?.email}</p>
          <p className='ml-[50px] text-[28px]'>Age: {user?.age}</p>
          <p className='ml-[50px] text-[28px] mb-9'>Learning Style: {user?.learningStyle}</p>
        </div>


      </div>
    </div>
  );
}

const StudentProfile = () => {
  const [chartSrc, setChartSrc] = useState('');

    useEffect(() => {
        // Make a request to the Flask endpoint
        axios.post('http://127.0.0.1:5000/getChart', { chart_type: 'course_progress'})
            .then(response => setChartSrc(response.data.image))
            .catch(error => console.error('Error fetching chart:', error));
    }, []);


  return (
    <section>
      <div>
        <StudentDetails />

        <ProgressReport />
        {chartSrc && <img src={`data:image/png;base64,${chartSrc}`} alt="Course Progress Chart" />}

      </div>
    </section>
  )
}

export default StudentProfile
