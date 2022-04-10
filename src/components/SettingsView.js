import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";

export default function SettingsView(props) {
    let navigate = useNavigate();

    const [allQuestions, setallQuestions] = useState([])
    const [categories, setcategories] = useState([])
    const [difficulties, setdifficulties] = useState([])

    let getAllQuizQuestions=()=>{
      fetch("https://opentdb.com/api.php?amount=100")
      .then(res=>res.json())
      .then(questionsData=>{
          setallQuestions(questionsData.results)
          let tempcategories=[]
          let tempdifficulties=[]
          questionsData.results.forEach(question => {
            if(!(tempcategories.includes(question.category))){
                tempcategories.push(question.category)
            }
            if(!(tempdifficulties.includes(question.difficulty))){
                tempdifficulties.push(question.difficulty)
            }
        });
        setcategories(tempcategories)
        setdifficulties(tempdifficulties)

        props.categorySetter(tempcategories[0])
        props.difficultySetter(tempdifficulties[0])
        })
    }

    useEffect(()=>{
        getAllQuizQuestions()

    },[])
    
  return (
    <div>
        <h3>Welcome {props.userName} </h3>
         <label>Set up your quiz difficulty </label>
        {/* <label>Categories: </label>
        <select name="Categories" id="Categories" onChange={(selected)=>{
            // console.log(selected.target.value)
            props.categorySetter(selected.target.value)
        }}>
            {categories.map(category=><option value={category}>{category}</option>)}
        </select>
        <br/>
        <br/> */}
        {/* <label>Difficulty: </label> */}
        <select name="Difficulty" id="Difficulty" onChange={(selected)=>{
            props.difficultySetter(selected.target.value)
        }}>
            {difficulties.map(difficulty=><option value={difficulty}>{difficulty}</option>)}
        </select>
        <br/>
        <br/>
        <button onClick={()=> navigate('/QuestionsView')}>start Quiz</button>
    </div>
    
  )
}
