import React from 'react'
import pieImg from '../../assets/images/pie.png'
import graphImg from '../../assets/images/graph.png'


const ChartComponent = () => {
  return (
    <section>
     <div className="container">
      
      <div className="flex flex-row">
        <img src={pieImg} alt="" className='w-[600px] h-[600px]'/>
        <img src={graphImg} alt="" className='w-[600px] h-[600px] ml-5'/>
      </div>
      
      
     </div>
    </section>
  )
}

export default ChartComponent