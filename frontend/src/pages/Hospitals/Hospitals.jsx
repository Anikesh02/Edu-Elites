import {React,useState} from 'react'
import DoctorCard from '../../components/Course/CourseCard'
import {doctors} from '../../assets/data/courses'
import Testimonial from '../../components/Testimonials/Testimonial'
import {getCourses} from '../../firebase.js'
import { useEffect } from 'react'

const Doctors = () => {


  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from both JSON file and database
    Promise.all([getCourses(), Promise.resolve(doctors)])
      .then(([dbCourses, jsonCourses]) => {
        // Combine the courses from the database and the JSON file
        const combinedCourses = jsonCourses.concat(dbCourses);
        setCourses(combinedCourses);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);


  return  <>
  <section className='bg-[#fff9ea]'>
    <div className="container text-center">
      <h2 className='heading'>Find a Course</h2>
      <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
        <input type="search" className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor" placeholder="Search by courses" />
        <button className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>
      </div>
    </div>
  </section>

  <section>
    <div className="container">
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {doctors.map((doctor)=>(
        <DoctorCard key={doctor.id} doctor={doctor}/>
        ))}
        { console.log(doctors) }

    </div>
    </div>
  </section>

  <section>
      <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our Student's say</h2>
            <p className="text__para text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum voluptates aspernatur ex, amet.</p>
        </div>

        <Testimonial />
        </div>
      </section>
  </>
  
}

export default Doctors