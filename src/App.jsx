import React from "react";
import { Home ,AllTasks,ImportantTasks,InCompletedTasks,CompletedTasks} from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-gray-900 text-white h-screen p-2  relative">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index element={<AllTasks/>}/>
          <Route path='/important' element={<ImportantTasks/>}/>
          <Route path='/completed' element={<CompletedTasks/>}/>
          <Route path='/incompleted' element={<InCompletedTasks/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
