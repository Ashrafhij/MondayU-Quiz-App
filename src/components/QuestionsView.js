import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";


export default function QuestionsView(props) {
    let navigate = useNavigate();

    const [questiontoshow, setquestiontoshow] = useState(0)
    const [allQuestions, setallQuestions] = useState([])
    const [categories, setcategories] = useState([])
    const [difficulties, setdifficulties] = useState([])
    const [questions, setquestions] = useState([])
    const [score, setscore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    // const [shuffled, setShuffled] = useState(false)
    const [percent, setpercent] = useState(10)
    const [progress, setprogress] = useState(0)
    const [runningInterVal, setrunningInterVal] = useState(null)
    var shuffled =false
    var timeleft = 60
    let getAllQuizQuestions=()=>{
      fetch("https://opentdb.com/api.php?amount=100")
      .then(res=>res.json())
      .then(questionsData=>{
          setallQuestions(questionsData.results)
          let tempcategories=[]
          let tempdifficulties=[]
          setallQuestions(questionsData.results.filter(question => question.difficulty == props.selectedDifficulty))
        })
    }
    useEffect(()=>{
        getAllQuizQuestions()

    },[])

    useEffect(()=>{
        countDown()
    },[questiontoshow])

    function shuffleArray(array) {
        if(!shuffled){
            return array
        }else{
            for (var i = array?.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            shuffled=true
            return array
        }

    }

    function countDown(){
        if(runningInterVal!= null){
            clearInterval(runningInterVal)
        
    }
    
            const interValId = setInterval(() => {
                if (timeleft>1) {
                    timeleft--;
                setTimeLeft(timeleft)
                }else{
                    setquestiontoshow(questiontoshow+1)
                    setTimeLeft(60)
                    shuffled=false
                    timeleft=60;
                }
                
            }, 1000);
    
            setrunningInterVal(interValId)
    }
    

    

  return (
    <div>
        <h2 style={{display:allQuestions.length ==0 ? 'block':'none'}}>Loading...</h2>
        <div style={{display:allQuestions.length>0 && allQuestions.length<questiontoshow+1 ? 'block':'none'}}>
            {score > 60 ? 
            <div>
                <h1>Your score is : {score}</h1>
                <h3>:)</h3>
                <img style={{width:'200px',height:'200px'}}  src="https://w7.pngwing.com/pngs/322/223/png-transparent-birthday-party-celebrate-banner-belt-ribbon-text-photography.png"/>
            </div>
            :
            <div>
            <h1>Your score is : {score}</h1>
            <h3>:(</h3>
            <img style={{width:'200px',height:'200px'}} src="https://www.pngitem.com/pimgs/m/20-201574_failed-test-clip-art-task-clipart-hd-png.png"/>
            </div>
            }
            <button onClick={()=> navigate('/')}>Try again</button>
        </div>

        <div style={{display:allQuestions.length>=questiontoshow+1? 'block':'none'}} >

        <ProgressBar
        percent={progress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        />
        {
            score > 60?
            <h2 style={{color:'green'}}>Score :{score}/100</h2>
            :
            <h2 style={{color:'red'}}>Score :{score}/100</h2>  
        }
        <h2>category :{props.selectedCategory}</h2>
        <h2>Difficulty :{allQuestions[questiontoshow]?.difficulty}</h2>
        <h2>Time left :{timeLeft}</h2>
        <h3>{allQuestions[questiontoshow]?.question}</h3>
        {shuffleArray(allQuestions[questiontoshow]?.incorrect_answers.concat(allQuestions[questiontoshow]?.correct_answer))?.map(
          answer=>  <button onClick={()=>{
              if(answer==allQuestions[questiontoshow]?.correct_answer){
                  setscore(score+Math.floor(100/allQuestions.length))
              }
              setprogress(progress+Math.floor(100/allQuestions.length))
              setquestiontoshow(questiontoshow+1)
              shuffled=false
            }}>{answer}</button>
        )}
        <br/>
    </div>

    </div>
  )
}
