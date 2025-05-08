import React from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const data = [
    { title: "All tasks", icon: <CgNotes />,link:'/' },
    { title: "Important tasks", icon: <MdLabelImportant />,link:'/important'},
    { title: "Completed tasks", icon: <FaCheckDouble />,link:'/completed' },
    { title: "Incompleted tasks", icon: <TbNotebookOff /> ,link:'/incompleted'},
  ];
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold"> The Task Manager</h2>
        <h4 className="mb-1 text-shadow-gray-400"> Suhail@gmail.com</h4>
        <hr />
      </div>
      <div className="">
        {data.map((item, i) => {
          return (
            <Link  to={item.link} className="flex my-2 items-center hover:bg-gray-600 p-2 rounded transition-all duration-300 ">
              {item.icon} <>&nbsp;</>  {item.title}
            </Link>
          );
        })}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded">
            Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
