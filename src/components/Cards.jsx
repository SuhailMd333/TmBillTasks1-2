import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
const Cards = ({home,setInputDiv}) => {
  const data = [
    {
      tite: "The Best Coding ",
      desc: "I have to create my channel the best ever coding channel  in hindi for those who do not understand english pro",
      status:"In Complete"
    },
    {
      
      tite: "CPP Concepts",
      desc: "I need to clear basics of cpp . Topic: Inheritance,Polymorphism,Abstraction,Pointer,who do not understand english pro ",
      status:"In Complete"
    },
    {
      tite: "DSA Concepts",
      desc: "I need to clear basics of DSA . Topics: Arrays,Linked List,Stack,Queue etc",
      status:"In Complete"
    },
    {
      tite: "Data Analyst Concepts",
      desc: "I need to clear basics of Excel, Power BI, Statistics, etc ",
      status:"Complete"
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 ">
      {data.map((item, i) => {
        return (
          <div className=" flex flex-col justify-between border border-gray-500  bg-gray-700 p-4 rounded-sm">
            <div className="">
              <h2 className="text-xl font-semibold">{item.tite}</h2>
              <p className="text-sm text-gray-300 my-2  wrap-break-word" >{item.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button className={`${item.status === "In Complete"? 'bg-red-400': 'bg-green-700' } p-2 rounded w-3/6`}>
                {item.status}
              </button>
              <div className="text-white  p-2 w-3/6 text-2xl font-semibold flex justify-around gap-4">
                <button>
                  
                  <CiHeart />
                </button>
                <button>
                
                  <FaEdit />
                </button>
                <button>
                 
                  <IoMdArchive />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      { home == "true" &&
      (
      <button onClick={ () => setInputDiv("fixed")} className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hove:cursor-pointer transition-all duration-300">
       <IoMdAddCircle className="text-5xl" />
        <h2 className="text-xl font-semibold mt-4">Add New Task</h2>
      </button>
      )}
    </div>
  );
};

export default Cards;
