import React from "react";
import { RxCross2 } from "react-icons/rx";
const InputData = ({inputDiv,setInputDiv}) => {
  return (
    <>
      <div className={` ${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full `}></div>
      <div className={` ${inputDiv} top-0 left-0 flex items-center justify-center  h-screen w-full `}>
        <div className="w-2/6 bg-gray-900 p-4 rounded-xl">
        <div className="flex justify-end ">
            <button className="text-2xl mb-3" onClick={ () => setInputDiv("hidden")}>
                <RxCross2/>
            </button>
        </div>
          <input
           type="text"
           placeholder="Title" 
           name="title" 
           className="px-3 py-2 bg-gray-700 rounded w-full "
           />
            <textarea 
           cols="30"
            rows="10"
           type="text"
           placeholder="Description..." 
           name="desc" 
           className="px-3 py-2 rounded w-full bg-gray-700 my-3 "
           >
           </textarea>
           <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold">
            Submit
           </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
