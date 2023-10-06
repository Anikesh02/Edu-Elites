import React from 'react'


const EnrolledCourses = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <div className='heading ml-[50px]'>Enrolled Courses:</div>
      </div>
    </div>
  );
}
const StudentDetails = () => {
  return (
    <div className='flex flex-col'>
        <div className='heading ml-[50px]'>Student Details:</div>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <div className='heading ml-[50px]'>Name:</div>
              <div className='heading ml-[50px]'>Email:</div>
              <div className='heading ml-[50px]'>Phone:</div>
            </div>
    </div>
    </div>
  );
}

const StudentProfile = () => {
  return (
    <section>
      <div>
        <StudentDetails />

        <EnrolledCourses />
      </div>
    </section>
  )
}

export default StudentProfile
