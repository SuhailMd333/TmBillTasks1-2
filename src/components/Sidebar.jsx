import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web"; 
import {useDispatch} from "react-redux";  
import {authActions} from '../reducer/auth'
import { useNavigate } from "react-router-dom";
import axios from "axios";  

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const history = useNavigate()
  // Create a state to trigger animation
  const [isVisible, setIsVisible] = useState(false);
  const [Data,setData] = useState()
  // Slide-in animation using react-spring
  const slideIn = useSpring({
    transform: isVisible ? "translateX(0)" : "translateX(-100%)",
    opacity: isVisible ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  // Set the sidebar visible after the component mounts and fetch the data of /get-all-task
 const headers = { 
  id:localStorage.getItem("id"),
  authToken:localStorage.getItem('token')
  }
  useEffect(() => {
    setIsVisible(true);
    console.log(headers)
    const fetch = async  () => {
   const res =  await axios.get("https://tmbill-backend.onrender.com/api/v2/get-all-task",
    {headers})
   setData(res.data.user)
   
    }
    fetch()
  }, []);

  const navItems = [
    { title: "All Tasks", icon: <CgNotes />, link: "/" },
    { title: "Important", icon: <MdLabelImportant />, link: "/important" },
    { title: "Completed", icon: <FaCheckDouble />, link: "/completed" },
    { title: "Incompleted", icon: <TbNotebookOff />, link: "/incompleted" },
  ];

  const logout = () => {
        dispatch(authActions.logout())
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        history("/login")
  }
  return (
    <animated.div style={slideIn} className="flex flex-col h-full justify-between text-white">
     {Data && ( <div className="mb-6">
         <h2 className="text-2xl font-bold">TM Bill Task Manager</h2>
        <h3 className="text-2xl font-bold">{Data.username}</h3>
        <p className="text-sm text-gray-400">{Data.email}</p>
      </div>)}

      <div className="space-y-2">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              location.pathname === item.link
                ? "bg-blue-600 text-white shadow"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="pt-6">
        <button onClick={logout} className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition">
          Log Out
        </button>
      </div>
    </animated.div>
  );
};

export default Sidebar;
