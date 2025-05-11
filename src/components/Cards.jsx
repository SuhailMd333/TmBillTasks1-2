/* eslint-disable no-unused-vars */
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { useSpring, animated } from '@react-spring/web'; // For animations
import axios from "axios";
import { FaHeart } from "react-icons/fa";
const Cards = ({ home, setInputDiv,data,updateTaskStatus,toast,setupdatedData}) => {
 

  // Animation for the cards
  const cardAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 220, friction: 50 },
  });
 
  

       const headers = { 
  id:localStorage.getItem("id"),
  authToken:localStorage.getItem('token')
  }
  // complete task
   const handleCompleteTask =  async (id) => {

 
           try {
            const response = await axios.put(`http://localhost:5000/api/v2/update-complete-task/${id}`,{},{headers})
              updateTaskStatus(id,'completed');
               if(home === "false") {
               updateTaskStatus(id, 'delete')
               }
              toast.success(response.data.message)
           } catch (error) {
            console.log(error)
           }
   }
   // handle important task
 const handleImportant = async (id) => {
  try {
            const response = await axios.put(`http://localhost:5000/api/v2/update-imp-task/${id}`,{},{headers})
               updateTaskStatus(id,'important');
               if(home === "false") {
               updateTaskStatus(id, 'delete')
               }
              toast.success(response.data.message)
            console.log(response)
           } catch (error) {
            console.log(error)
           }
 }
 // delete task 
  const deleteTask = async (id) => {
  try {
            const response = await axios.delete(`http://localhost:5000/api/v2/delete-task/${id}`,{headers})
               updateTaskStatus(id,'delete');
              toast.success(response.data.message)
            console.log(response)
           } catch (error) {
            console.log(error)
           }
 }
 //update task 
 const handleUpdate = (id,title,desc) => {
  setInputDiv('fixed')
  setupdatedData({id:id,title:title,desc:desc})
 }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      { data &&
      data.map((item, i) => {
        return (
          <animated.div key={i} style={cardAnimation} className="flex flex-col justify-between border border-gray-500 bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-70">
            <div>
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="text-sm text-gray-300 my-2 break-words">{item.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center justify-between">
              <button
                className={`${
                  item.completed === false ? "bg-red-700" : "bg-green-700"
                } p-2 rounded  text-white cursor-pointer`}
                onClick={() =>  handleCompleteTask(item._id)}
              >
                {item.completed === true ? "Completed" : "Incompleted"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around gap-4">
                <button onClick={() => handleImportant(item._id)} className="text-red-500 cursor-pointer">
                { item.important === false ? <CiHeart /> : <FaHeart />}
                </button>
               {
                home === "true" && (
                  <button onClick={() => handleUpdate(item._id,item.title,item.desc)} className="cursor-pointer" >
                  <FaEdit />
                </button>
                )
               }
                <button onClick={() => deleteTask(item._id)} className="cursor-pointer" >
                  <IoMdArchive />
                </button>
              </div>
            </div>
          </animated.div>
        );
      })}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-6 text-gray-300 hover:scale-105 cursor-pointer transition-all duration-70"
        >
          <IoMdAddCircle className="text-5xl" />
          <h2 className="text-xl font-semibold mt-4">Add New Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
