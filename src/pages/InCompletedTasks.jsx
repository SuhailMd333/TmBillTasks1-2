import React,{useState,useEffect} from 'react'
import {Cards} from '../components'
import axios from 'axios'

const InCompletedTasks = () => {

  const [data,setData] = useState([])  
    const headers = { 
      id:localStorage.getItem("id"),
      authToken:localStorage.getItem('token')
      }
    
     useEffect(() => {
        
        
        const fetch = async  () => {
       const res =  await axios.get("https://tmbill-backend.onrender.com/api/v2/get-incomplete-tasks",
        {headers})
       setData(res.data.data || [])
       console.log(res.data)
        }
        fetch()
      }, []);
  
  
      // Function to update task status (will be passed to Cards)
    const updateTaskStatus = (taskId, type) => {
      if (type === 'delete') {
        setData(prev => prev.filter(task => task._id !== taskId));
      } else {
        setData(prev => 
          prev.map(task => 
            task._id === taskId ? { ...task, [type]: !task[type] } : task
          )
        );
      }
    };
  return (
    <div>
      <Cards home={"false"} updateTaskStatus={updateTaskStatus} data={data} />
    </div>
  )
}

export default InCompletedTasks