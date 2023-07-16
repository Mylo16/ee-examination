import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/firestore/firestoreSlice';
import { Link } from 'react-router-dom';
import { openQuiz } from '../redux/home/quizSlice';

export default function Levels() {
  const { questions, isLoading, error } = useSelector((store) => store.firestore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const [semester1Pressed, setSemester1Pressed] = useState({
    level_100: false,
    level_200: false,
    level_300: false,
    level_400: false,
  });

  const [semester2Pressed, setSemester2Pressed] = useState({
    level_100: false,
    level_200: false,
    level_300: false,
    level_400: false,
  });

  function HandleSemester1(level) {
    if(level === 100) {
      setSemester1Pressed({...semester1Pressed, level_100: true, level_200: false, level_300: false, level_400: false});
      setSemester2Pressed({...semester2Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
    }
    else if (level === 200) {
      setSemester1Pressed({...semester1Pressed, level_100: false, level_200: true, level_300: false, level_400: false});
      setSemester2Pressed({...semester2Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
    }
    else if (level === 300) {
        setSemester1Pressed({...semester1Pressed, level_100: false, level_200: false, level_300: true, level_400: false});
        setSemester2Pressed({...semester2Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
    }
    else if (level === 400) {
        setSemester1Pressed({...semester1Pressed, level_100: false, level_200: false, level_300: false, level_400: true});
        setSemester2Pressed({...semester2Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
    }
  };

  function HandleSemester2(level) {
    if(level === 100) {
      setSemester1Pressed({...semester1Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
      setSemester2Pressed({...semester2Pressed, level_100: true, level_200: false, level_300: false, level_400: false});
    }
    else if (level === 200) {
      setSemester1Pressed({...semester1Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
      setSemester2Pressed({...semester2Pressed, level_100: false, level_200: true, level_300: false, level_400: false});
    }
    else if (level === 300) {
        setSemester1Pressed({...semester1Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
        setSemester2Pressed({...semester2Pressed, level_100: false, level_200: false, level_300: true, level_400: false});
    }
    else if (level === 400) {
        setSemester1Pressed({...semester1Pressed, level_100: false, level_200: false, level_300: false, level_400: false});
        setSemester2Pressed({...semester2Pressed, level_100: false, level_200: false, level_300: false, level_400: true});
    }
  };

  function HandleQuizSelect(value) {
    dispatch(openQuiz(value));
  }

  if(isLoading) {
    return (
      <div className="loader-container">
      	<div className="spinner"></div>
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
      <h2 className="common-courses">Year</h2>
      <div id="courses" className="level-container">
        <div className="level-sub-container">
          <div className="level">
            <p className="level-name">100</p>
            <div className="buttons-container">
              <button className={semester1Pressed.level_100 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester1(100)}>Semester I</button>
              <button className={semester2Pressed.level_100 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester2(100)}>Semester II</button>
            </div>
          </div>
          <div className="desktop-level-container">
          <div className={semester1Pressed.level_100 ? 'sem-courses-container' : 'hide-sem'}>
            <p className="desktop-level-header">Semester I</p>
            {
              Object.entries(questions.level100.sem1).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          <div className={semester2Pressed.level_100 ? 'sem-courses-container' : 'hide-sem'}>
            <p className="desktop-level-header">Semester II</p>
            {
              Object.entries(questions.level100.sem2).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          </div>
          
        </div>
        <div className="level-sub-container">
          <div className="level">
            <p className="level-name">200</p>
            <div className="buttons-container">
              <button className={semester1Pressed.level_200 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester1(200)}>Semester I</button>
              <button className={semester2Pressed.level_200 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester2(200)}>Semester II</button>
            </div>
          </div>
          <div className="desktop-level-container">
          <div className={semester1Pressed.level_200 ? 'sem-courses-container' : 'hide-sem'}>
            {
              Object.entries(questions.level200.sem1).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          <div className={semester2Pressed.level_200 ? 'sem-courses-container' : 'hide-sem'}>
            {
              Object.entries(questions.level200.sem2).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          </div>
        </div>
        <div className="level-sub-container">
          <div className="level">
            <p className="level-name">300</p>
            <div className="buttons-container">
              <button className={semester1Pressed.level_300 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester1(300)}>Semester I</button>
              <button className={semester2Pressed.level_300 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester2(300)}>Semester II</button>
            </div>
          </div>
          <div className="desktop-level-container">
          <div className={semester1Pressed.level_300 ? 'sem-courses-container' : 'hide-sem'}>
            {
              Object.entries(questions.level300.sem1).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          <div className={semester2Pressed.level_300 ? 'sem-courses-container' : 'hide-sem'}>
            {
              Object.entries(questions.level300.sem2).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          </div>
        </div>
        <div className="level-sub-container">
          <div className="level">
            <p className="level-name">400</p>
            <div className="buttons-container">
              <button className={semester1Pressed.level_400 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester1(400)}>Semester I</button>
              <button className={semester2Pressed.level_400 ? 'orange' : 'violet'} type="button" onClick={() => HandleSemester2(400)}>Semester II</button>
            </div>
          </div>
          <div className="desktop-level-container">
          <div className={semester1Pressed.level_400 ? 'sem-courses-container' : 'hide-sem'}>
            {
              Object.entries(questions.level400.sem1).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          <div className={semester2Pressed.level_400 ? 'sem-courses-container' : 'hide-sem'}>
            {
              Object.entries(questions.level400.sem2).map(([key, value]) => (
                <div className="sem-courses" key={key}>
                  <div className="sem-courses-head">
                    <p className="course_code">{value.course_code}</p>
                    <button onClick={() => HandleQuizSelect(value)} type="button"><Link className="level-link" to='/quiz'>Quiz</Link></button>
                    <button type="button">Slides</button>
                  </div>
                  <p className="course_name">{value.course_name}</p>
                </div>
              ))
            }
          </div>
          </div>
        </div>
      </div>
    </>
  );
}