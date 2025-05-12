import { useState, useEffect } from "react";
import { Cards, InputData } from "../components";
import { IoMdAddCircle } from "react-icons/io";
import { useSpring, animated } from "@react-spring/web";
import { Toaster, toast } from "react-hot-toast";
 import axios from "axios";
const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [isMounted, setIsMounted] = useState(false); // state to track component mount
  const [Data,setData] = useState()
  const [updatedData,setupdatedData] = useState({id:"",title:"",desc:""})
  // Ensuring the animation triggers only after the component has mounted
  useEffect(() => {
    setIsMounted(true); // Set to true once the component mounts
  }, []);

  // react-spring animation for the card section
  const animationProps = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)", // slide-in effect
    config: { duration: 500 }, // animation duration
  });

   const headers = { 
  id:localStorage.getItem("id"),
  authToken:localStorage.getItem('token')
  }

 useEffect(() => {
    
    console.log(headers)
    const fetch = async  () => {
   const res =  await axios.get("https://tmbill-backend.onrender.com/api/v2/get-all-task",
    {headers})
   setData(res.data.user.tasks)
   console.log(res.data.user.tasks)
    }
    fetch()
  }, []);
  // Update the updateTaskStatus function to handle deletion

   const updateTaskStatus = (taskId, type,updatedFields={}) => {
  
  if (type === 'delete') {
    // Remove the task from the array
    setData(prevData => prevData.filter(task => task._id !== taskId));
  } else if(type=== 'updated'){
    setData( prevData => 
      prevData.map(task => {
        if(task._id === taskId ) {
          return {
            ...task,
            ...updatedFields
          }
        }
        return task;
      })
    )
  } else {
    // Handle completed/important toggles
    setData(prevData => 
      prevData.map(task => {
        if (task._id === taskId) {
          return { 
            ...task, 
            [type]: !task[type] 
          };
        }
        return task;
      })
    );
  }
};
// Function to add new task to state
  const addNewTask = (newTask) => {
    setData(prevTasks => [newTask, ...prevTasks]);
  };
 
  return (
    <>
      {/* Floating "Add New Task" Button */}
      <div className="w-full flex justify-end px-4 py-2 mask-b-to-orange-60">
        <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-gray-800 text-white border border-gray-700",
        }}
      />
        <button
          onClick={() => setInputDiv("fixed")}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
        >
          <IoMdAddCircle className="text-4xl" />
        </button>
      </div>

      {/* Cards Section with animation */}
      <animated.div style={animationProps} className="overflow-hidden max-h-screen">
        <div className="px-4">
        { Data && (  <Cards setupdatedData={setupdatedData} toast={toast} home={"true"} setInputDiv={setInputDiv} data={Data} updateTaskStatus={updateTaskStatus} fetch={fetch} />)}
        </div>
      </animated.div>

      {/* Input Data Form (only shown when required) */}
      <InputData updateTaskStatus={updateTaskStatus} addNewTask={addNewTask} fetch={fetch} inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setupdatedData={setupdatedData} />
    </>
  );
};

export default AllTasks;
