import React,{useState,useEffect} from 'react'
import {Cards} from '../components'
import axios from 'axios'

const CompletedTasks = () => {

  const [data,setData] = useState([])  
    const headers = { 
      id:localStorage.getItem("id"),
      authToken:localStorage.getItem('token')
      }
    
     useEffect(() => {
        
        
        const fetch = async  () => {
       const res =  await axios.get("http://localhost:5000/api/v2/get-complete-tasks",
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
      <Cards home={"false"} data={data} updateTaskStatus={updateTaskStatus} />
    </div>
  )
}

export default CompletedTasks