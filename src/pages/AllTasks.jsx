import { useState } from 'react';
import { Cards,InputData } from '../components'
import { IoMdAddCircle } from "react-icons/io";

const AllTasks = () => {
  const [inputDiv,setInputDiv] = useState("hidden")
  return (
    <>
    
       <div className="w-full flex justify-end px-4  py-2 ">
        <button onClick={() => setInputDiv("fixed")}>
          <IoMdAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300 ' />
        </button>
       </div>
      <Cards home={"true"} setInputDiv={setInputDiv}/>
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
    </>
  )
}

export default AllTasks