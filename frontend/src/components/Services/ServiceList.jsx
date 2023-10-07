import React from 'react'

import DoctorCard from '../Course/CourseCard'
import {doctors} from '../../assets/data/courses'


const ServiceList = () => {
  return (
    <section>
    <div className="container">
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {doctors.map((doctor)=>(
        <DoctorCard key={doctor.id} doctor={doctor}/>
        ))}
    </div>
    </div>
  </section>
  )
}

export default ServiceList