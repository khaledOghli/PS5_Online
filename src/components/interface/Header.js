import React, {useState,useEffect} from 'react'
import { GoSearch } from 'react-icons/go';
import { BsFillGearFill } from 'react-icons/bs';
import classes from './Header.module.css'

function Header(props) {
  const [isLoaded,setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    
  }, []);
  return (
    isLoaded && <header className={`${classes.ps_header}`}>
      <nav>
        <div className={classes.ps_header_left}>
          <ul>
            <li style={{ "--header-delay": '0.1s' }} className={classes.active}>Games</li>
            <li style={{ "--header-delay": '0.2s' }}>Media</li>
          </ul>
        </div>
        <div className={classes.ps_header_right}>
          <ul>
            <li style={{ "--header-delay": '0.3s' }}>
              <GoSearch />
            </li>
            <li style={{ "--header-delay": '0.4s' }}>
              <BsFillGearFill/>
            </li>
            <li style={{ "--header-delay": '0.5s' }}>
              <span className={classes.ps_profile_img}>
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="avatar" />
                <span className={`${classes.ps_profile_status} ${classes.online}`}></span>
              </span>
            </li>
            <li style={{ "--header-delay": '0.6s' }} className={classes.ps_time}>
              4:42 PM
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header