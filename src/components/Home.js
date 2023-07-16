import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css';
import search from '../assets/search.png';
import Levels from './Levels';
import CommonCourses from './CommonCourses';

export default function Home() {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState('');

  return (
    <>
      <div className="header">
        <div className="header-container">
          <h1 className="main-heading">EE PREP</h1>
          <div className="input">
              <input value={searchData} onChange={(e) => setSearchData(e.target.value)} className="search-input" placeholder="search course" />
              <button type="button" className="search"><img src={search} alt="search button" /></button>
          </div>
        </div>
      </div>
      <CommonCourses />
      <Levels />
    </>
  );
}
