import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resultsDetails } from '../redux/home/resultsSlice';
import DOMPurify from 'dompurify';
import { CSSTransition } from 'react-transition-group';


export default function Quiz() {
  const { questions, isLoading, error } = useSelector((store) => store.firestore);
  const { quizData } = useSelector((store) => store.quiz);
  const [ques, setQues] = useState([...quizData.quiz]);
  const [options, setOptions] = useState([]);
  const [seconds,setSeconds]=useState(10);
  const [timeUp, setTimeUp]= useState(0);
  const [quesCount, setQuesCount] = useState(0);
  const [resultsQuestion,setResultsQuestion] = useState([]);
  const [resultsOptions, setResultsOptions] = useState([]);
  const [correct,setCorrect] = useState([]);
  const [score, setScore]= useState(0);
  const [ans,setAns] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();
  const [showAnim, setShowAnim] = useState(false);

  window.addEventListener('load', () => {
    window.location.assign('/');
  });

  const shuffleArray = (array)=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  };

  function generateOptionsAndShuffle(_question){
    const options= [..._question.options];
    shuffleArray(options);
    const opt = [];
    opt.push(options[0]);
    opt.push(options[1]);
    opt.push(options[2]);
    opt.push(_question.correct_answer);
    shuffleArray(opt);
    
    return opt;
  };

  useEffect(() => {
    setShowAnim(true);
    shuffleArray(ques);
    setOptions(generateOptionsAndShuffle(ques[0]));
  }, []);

  function handlSelectedOption(_option, bool){
    if(!bool) {setShowAnim(false)};
  }

  const [checked, setChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  function HandleChecked(id) {
    if(id === '1') {
      setChecked({...checked, check1: true, check2: false, check3: false, check4: false});
    }
    if(id === '2') {
      setChecked({...checked, check1: false, check2: true, check3: false, check4: false});
    }
    if(id === '3') {
      setChecked({...checked, check1: false, check2: false, check3: true, check4: false});
    }
    if(id === '4') {
      setChecked({...checked, check1: false, check2: false, check3: false, check4: true});
    }
  }

  function HandleChange(e) {
    setSelectedOption(e.target.value);
    HandleChecked(e.target.id);
  }

  function handleShowResults() {
    dispatch(resultsDetails({
      resultsQuestion,
      resultsOptions,
      ans,
      score,
      correct,
    }))
  }

  function handleTimeout() {
    if(selectedOption===ques[quesCount].correct_answer){
      setScore(score + 1);
      resultsQuestion.push({question:ques[quesCount].ques, answer: ques[quesCount].correct_answer, correct: true, quesImage: ques[quesCount].img ? ques[quesCount].img : ""});
      correct.push(true);
    }
    if(selectedOption !== ques[quesCount].correct_answer){
      resultsQuestion.push({question:ques[quesCount].ques, answer: ques[quesCount].correct_answer, correct: false, quesImage: ques[quesCount].img ? ques[quesCount].img : ""});
      correct.push(false);
    }

    if(quesCount !== ques.length-1){
      setShowAnim(true);
      setQuesCount(quesCount + 1);
      setOptions(generateOptionsAndShuffle(ques[quesCount + 1]));
      setSeconds(10);
    }
    else {
      setShowAnim(false);
      handleShowResults();
    }

    setChecked({...checked, check1: false, check2: false, check3: false, check4: false});

  }

  if(isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if(error) {
    return (
      <div>Error: Unstable network</div>
    );
  }

  return (
    <>
      <CSSTransition onExit={() => handleTimeout()} onEntered={() => setShowAnim(false)} in={showAnim} timeout={ques[quesCount].time} classNames={ques[quesCount].time === 60000?"example1":"example"} unmountOnExit>
        <div className="time-bar" />
      </CSSTransition>
      <div className="question-container">
        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(ques[quesCount].ques)}} />
        {ques[quesCount].img ? <img className="ques-img" src={ques[quesCount].img} alt="question diagram" /> : ""}
        <div>
          <input checked={checked.check1} onChange={HandleChange} type="radio" id="1" value={options[0]} />
          <label htmlFor="1">{options[0]}</label><br />
          <input checked={checked.check2} onChange={HandleChange} type="radio" id="2" value={options[1]} />
          <label htmlFor="2">{options[1]}</label><br />
          <input checked={checked.check3} onChange={HandleChange} type="radio" id="3" value={options[2]} />  
          <label htmlFor="3">{options[2]}</label><br />
          <input checked={checked.check4} onChange={HandleChange} type="radio" id="4" value={options[3]} />  
          <label htmlFor="4">{options[3]}</label><br />
        </div>
        {quesCount !== ques.length-1
        ? <button onClick={() => handlSelectedOption(selectedOption, false)} className="next-button" type="button">Next</button>
        : <button onClick={() => handleShowResults()} className="next-button" type="button"><Link className="show-results" to="/results">Show Results</Link></button>}
        
      </div>
    </>
  );
}
