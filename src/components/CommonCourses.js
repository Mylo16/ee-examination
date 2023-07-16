import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chevronDown from '../assets/chevron-down.png';
import chevronUp from '../assets/chevron-up.png';
import { openQuiz } from '../redux/home/quizSlice';
import { Link } from 'react-router-dom';

export default function CommonCourses() {
  const dispatch = useDispatch();
  const { questions, isLoading, error } = useSelector((store) => store.firestore);
  const [chevronPressed, setChevronPressed] = useState({
    press1: false,
    press2: false,
    press3: false,
    press4: false,
    press5: false,
    press6: false,
    press7: false,
    press8: false,
  });

  function handleQuizSelect(value) {
    dispatch(openQuiz(value));
  }

  if(isLoading) {
    return (
      <div className="loader-container">
      	<div className="spinner" />
      </div>
    );
  }
  if(error) {
    return (
      <div>Network is Unstable</div>
    );
  }

  return (
    <>
      <h2 className="common-courses">Common Courses</h2>
      <div className="cc-container">
        <div className="cc-sub-container">
          <div className="cc">
            <div className="cc-code-container">
              <p className="cc-code">EE 278</p>
            </div>
            <p className="cc-name">{questions.level200.sem1.asynchronous.course_name}</p>
            <button className="chevron" type="button" onClick={() => setChevronPressed({...chevronPressed, press1: !chevronPressed.press1})}>
              <img className="chevron" src={chevronPressed.press1 ? chevronUp : chevronDown} alt="down arrow" />
            </button>
          </div>
          <button onClick={() => handleQuizSelect(questions.level200.sem1.asynchronous)} className={chevronPressed.press1 ? 'show-btn' : 'hide-btn'} type="button">
            <Link className="cc-links" to='/quiz'>Take Quiz</Link>
          </button>
          <button className={chevronPressed.press1 ? 'show-btn' : 'hide-btn'} type="button">
          <Link className="cc-links" to='/slides'>Slides</Link>
          </button>
        </div>
        <div className="cc-sub-container">
          <div className="cc">
            <div className="cc-code-container">
              <p className="cc-code">EE 278</p>
            </div>
            <p className="cc-name">{questions.level200.sem1.circuit_theory.course_name}</p>
            <button type="button" onClick={() => setChevronPressed({...chevronPressed, press2: !chevronPressed.press2})}>
              <img className="chevron" src={chevronPressed.press2 ? chevronUp : chevronDown} alt="down arrow" />
            </button>
          </div>
          <button onClick={() => handleQuizSelect(questions.level200.sem1.circuit_theory)} className={chevronPressed.press2 ? 'show-btn' : 'hide-btn'} type="button">
            <Link className="cc-links" to='/quiz'>Take Quiz</Link>
          </button>
          <button className={chevronPressed.press2 ? 'show-btn' : 'hide-btn'} type="button">
            <Link className="cc-links" to='/slides'>Slides</Link>
          </button>
        </div>
        <div className="cc-sub-container">
          <div className="cc">
            <div className="cc-code-container">
              <p className="cc-code">EE 278</p>
            </div>
            <p className="cc-name">{questions.level200.sem1.c_programming.course_name}</p>
            <button type="button" onClick={() => setChevronPressed({...chevronPressed, press3: !chevronPressed.press3})}>
              <img className="chevron" src={chevronPressed.press3 ? chevronUp : chevronDown} alt="down arrow" />
            </button>
          </div>
          <button onClick={() => handleQuizSelect(questions.level200.sem1.c_programming)} className={chevronPressed.press3 ? 'show-btn' : 'hide-btn'} type="button">
            <Link className="cc-links" to='/quiz'>Take Quiz</Link>
          </button>
          <button className={chevronPressed.press3 ? 'show-btn' : 'hide-btn'} type="button">
            <Link className="cc-links" to='/slides'>Slides</Link>
          </button>
        </div>
        <div className="cc-sub-container">
          <div className="cc">
            <div className="cc-code-container">
              <p className="cc-code">EE 278</p>
            </div>
            <p className="cc-name">{questions.level100.sem1.applied_electricity.course_name}</p>
            <button type="button" onClick={() => setChevronPressed({...chevronPressed, press4: !chevronPressed.press4})}>
              <img className="chevron" src={chevronPressed.press4 ? chevronUp : chevronDown} alt="down arrow" />
            </button>
          </div>
          <button className={chevronPressed.press4 ? 'show-btn' : 'hide-btn'} type="button">
            <Link onClick={() => handleQuizSelect(questions.level100.sem1.applied_electricity)} className="cc-links" to='/quiz'>Take Quiz</Link>
          </button>
          <button className={chevronPressed.press4 ? 'show-btn' : 'hide-btn'} type="button">
            <Link className="cc-links" to='/slides'>Slides</Link>
          </button>
        </div>
      </div>
    </>
  );
}