import React from 'react'
import { useUser } from '../UserContext.jsx';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getParameters } from '../firebase.js';
import axios from 'axios';
import Barchart from '../components/BarChart.jsx';



const ProgressReport = () => {
  return (
    <div className='flex flex-col mt-9'>
      <div className='flex flex-row mt-9'>
        <div className='heading ml-[85px]'>Progress Report:</div>


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
      <div className='text-[50px] heading ml-[80px] mt-9 mb-[30px]'>Hello, {user?.name}.</div>
      <div className='flex flex-col ml-9'>
        <div className='flex flex-col'>
          <p className='ml-[50px] text-[22px] mt-3'>Email: {user?.email}</p>
          <p className='ml-[50px] text-[22px] mt-3'>Age: {user?.age}</p>
          <p className='ml-[50px] text-[22px] mb-9 mt-3'>Learning Style: {user?.learningStyle}</p>
        </div>


      </div>
    </div>
  );
}

const StudentProfile = () => {
  const [chartSrc, setChartSrc] = useState('');
  const [marksChartSrc, setMarksChartSrc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to the Flask endpoint for the course progress chart
        const courseProgressResponse = await axios.post('http://127.0.0.1:5000/getChart', { chart_type: 'course_progress' });
        setChartSrc(courseProgressResponse.data.image);

        // Make a request to the Flask endpoint for the marks progression chart
        const marksProgressResponse = await axios.post('http://127.0.0.1:5000/getChart', { chart_type: 'marks_progress' });
        setMarksChartSrc(marksProgressResponse.data.image);
      } catch (error) {
        console.error('Error fetching charts:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <section>
      <div>
        <StudentDetails />

        <ProgressReport />
        <p className='text-[24px] ml-[90px] mt-9'>
          Here are your progress charts:
        {chartSrc && <img src={`data:image/png;base64,${chartSrc}`} alt="Course Progress Chart" className='ml-[-75px] mb-[50px]'/>}

        </p>
        {marksChartSrc && <img src={`data:image/png;base64,${marksChartSrc}`} alt="Marks Progression Chart" />}

        <Barchart />


      </div>
    </section>
  )
}

export default StudentProfile
