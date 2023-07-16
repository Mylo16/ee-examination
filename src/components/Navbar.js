import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import hamburger from '../assets/hamburger.png';
import { setScrolledFalse, setScrolledTrue } from '../redux/home/homeSlice';
import close from '../assets/close.png';
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuClicked, setMenuClicked] = useState(false);
  const { scrolled } = useSelector((store) => store.home);
  const dispatch = useDispatch();
  
  function handleScroll() {
    const position = window.pageYOffset;
    if(position > 0) {
      dispatch(setScrolledTrue(true));
    }
    else if (position === 0) {
      dispatch(setScrolledFalse(false));
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  document.addEventListener('click', (e) => {
    if(e.target.className !== 'menu-hamburger' && e.target.className !== 'hamburger' && e.target.className !== 'nav-links'){
      setMenuClicked(false);
    }
  });
  
  function HandleMenuClick() {
    setMenuClicked(!menuClicked);
  };

  return (
    <>
      <nav className={scrolled ? 'blur' : 'navigation'}>
        <div className="nav-container">
          <button onClick={HandleMenuClick} className="menu-hamburger" type="button">
            <img className="hamburger" src={hamburger} alt="menu" />
          </button>
          <ul className={menuClicked ? 'nav-links' : 'no-menu'}>
            <button onClick={HandleMenuClick} type="button" className="close">
              <img src={close} alt="close button" />
            </button>
            <li><Link className="link" to="/">Home</Link></li>
            <li><a className="link" href="#courses">Courses</a></li>
            <li><Link className="link" to="/courses">About</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}