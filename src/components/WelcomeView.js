import React from 'react'
import { useNavigate } from "react-router-dom";

export default function WelcomeView(props) {
    let navigate = useNavigate();

return (
<div> 
    <header className="App">
        <h1>Welcome to my Quiz</h1>
        <img  src="https://img.lovepik.com/element/45009/5300.png_300.png"/>
        <h3>Enter your name</h3>
        <input onChange={e=>props.setuserName(e.target.value)}></input>
        <br/>
        <button onClick={()=> navigate('/SettingsView')}>start Quiz</button>
   
    </header>
</div>
)
}
