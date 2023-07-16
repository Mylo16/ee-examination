import { useSelector } from 'react-redux';
import React from 'react';
import ProgressBar from './progressBar';
import correct from '../assets/correct.png';
import wrong from '../assets/wrong.png';

export default function Results() {
  const { resultsData } = useSelector((store) => store.results);
  const percentMark = 100*resultsData.score/resultsData.resultsQuestion.length;

  return (
    <>
      <div className="results-container">
        <h1 className="results-head">Results:</h1>
        <h2>{resultsData.score}/{resultsData.resultsQuestion.length}</h2>
        <ProgressBar percentage={percentMark}/>
        <h2>Revision</h2>
        <div className="revision-container">
          {
            resultsData.resultsQuestion.map((question) => (
              <div className="revision-question" key={crypto.randomUUID()}>
                <div className="mark"><img src={question.correct ? correct : wrong} alt="mark" /></div>
                <p>{question.question}</p>
                {question.quesImage ==="" ? <p /> : <img className="ques-img" src={question.quesImage} alt="question image" />}
                <p>Correct Answer: {question.answer}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}