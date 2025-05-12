import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSpring, animated } from "@react-spring/web"; // For smooth animations
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
const InputData = ({
  inputDiv,
  setInputDiv,
  updatedData,
  addNewTask,
  fetch,
  setupdatedData,
  updateTaskStatus
}) => {
  const [Data, setData] = useState({ title: "", desc: "" });
  // Spring animation for sliding and opacity
  const animationProps = useSpring({
    opacity: inputDiv === "hidden" ? 0 : 1,
    transform: inputDiv === "hidden" ? "scale(0)" : "scale(1)",
    config: { tension: 200, friction: 18 }, // For smooth transition
  });
  const headers = {
    id: localStorage.getItem("id"),
    authToken: localStorage.getItem("token"),
  };
  // onchange for targeting the value
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  useEffect(() => {
    setData({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);

  // function for creating a task
  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      toast("Please fill all the fields");
    } else {
      try {
        const response = await axios.post(
          "https://tmbill-backend.onrender.com/api/v2/create-task",
          Data,
          { headers }
        );
        console.log(response);
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
        addNewTask({
          ...response.data.saveTask, // Assuming your API returns the created task
          _id: response.data.saveTask._id || Date.now().toString(), // Temporary ID if needed
        });

        toast.success("Task created successfully!");
      } catch (error) {
        console.log(error);
      }
    }
  };
  // function for updating a task
  const updateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      toast("Please fill all the fields");
    } else {
      try {
        const response = await axios.put(
          `https://tmbill-backend.onrender.com/api/v2/update-task/${updatedData.id}`,
          Data,
          { headers }
        );
         updateTaskStatus(updatedData.id, 'updated', {
      title: Data.title,
      desc: Data.desc
    });
        console.log(response);
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
        setupdatedData({ id: "", title: "", desc: "" });
       
        toast.success("Task updated successfully!");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {/* Background Overlay */}
      <div
        className={` ${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full fixed z-10 transition-all duration-70`}
      ></div>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-gray-800 text-white border border-gray-700",
        }}
      />

      {/* Modal Container with animation */}
      <animated.div
        style={animationProps}
        className={` ${inputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full z-20 transition-all duration-70`}
      >
        <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 xl:w-2/6 bg-gray-900 p-6 rounded-xl shadow-lg transform transition-all duration-70">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="text-3xl mb-3 text-white hover:text-gray-400 transition-all duration-70"
              onClick={() => {
                setInputDiv("hidden");
                setupdatedData({ id: "", title: "", desc: "" });
                setData({ title: "", desc: "" });
              }}
            >
              <RxCross2 />
            </button>
          </div>

          {/* Title Input */}
          <input
            value={Data.title}
            onChange={change}
            type="text"
            placeholder="Task Title"
            name="title"
            className="px-4 py-2 bg-gray-700 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 transition-all duration-70"
          />

          {/* Description Input */}
          <textarea
            onChange={change}
            value={Data.desc}
            cols="30"
            rows="5"
            placeholder="Description..."
            name="desc"
            className="px-4 py-2 rounded w-full bg-gray-700 my-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-70"
          ></textarea>

          {/* Submit Button */}
          {updatedData.id ==="" ? (
            <button
              onClick={submitData}
              className="cursor-pointer px-4 py-2 bg-blue-500 rounded text-white text-xl font-semibold w-full hover:bg-blue-600 transition-all duration-70"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={updateTask}
              className="cursor-pointer px-4 py-2 bg-blue-500 rounded text-white text-xl font-semibold w-full hover:bg-blue-600 transition-all duration-70"
            >
              Update
            </button>
          )}
        </div>
      </animated.div>
    </>
  );
};

export default InputData;
