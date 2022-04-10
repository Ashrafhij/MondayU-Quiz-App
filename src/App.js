import logo from './logo.svg';
import './App.css';
import WelcomeView from './components/WelcomeView';
import { useState } from 'react';
import SettingsView from './components/SettingsView';
import QuestionsView from './components/QuestionsView';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  let views = [<WelcomeView />,<SettingsView nextPage={nextPage}/>,<WelcomeView nextPage={nextPage}/>]
  const [viewToShow, setViewToShow] = useState(0)
  const [selectedCategory, setselectedCategory] = useState('')
  const [selectedDifficulty, setselectedDifficulty] = useState('')
  const [userName, setuserName] = useState('')

  function nextPage(){
    if(viewToShow + 1 <= views.length ){
      setViewToShow(viewToShow+1)
    }
    else{
      setViewToShow(0)
    }
  }

  return (
    <div className="App">
         <Routes>
        <Route path="/" element={<WelcomeView  userName={userName} setuserName={setuserName}/>} />
        <Route path="SettingsView" element={<SettingsView  userName={userName} selectedCategory={selectedCategory} 
                                                          categorySetter={setselectedCategory} 
                                                          selectedDifficulty={selectedDifficulty}
                                                          difficultySetter={setselectedDifficulty}/>} />
        <Route path="QuestionsView" element={<QuestionsView  userName={userName} selectedCategory={selectedCategory} selectedDifficulty={selectedDifficulty}  />} />
      </Routes>
    {/* {views[viewToShow]} */}
    </div>
  );
}



export default App;
