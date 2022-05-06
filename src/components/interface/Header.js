import React from 'react'
import { GoSearch } from 'react-icons/go';
import { BsFillGearFill } from 'react-icons/bs';
import classes from './Header.module.css'

function Header(props) {
  return (
    <header className={classes.ps_header}>
      <nav>
        <div className={classes.ps_header_left}>
          <ul>
            <li className={classes.active}>Games</li>
            <li>Media</li>
          </ul>
        </div>
        <div className={classes.ps_header_right}>
          <ul>
            <li>
              <GoSearch />
            </li>
            <li>
              <BsFillGearFill/>
            </li>
            <li>
              <span className={classes.ps_profile_img}>
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="avatar" />
                <span className={`${classes.ps_profile_status} ${classes.online}`}></span>
              </span>
            </li>
            <li className={classes.ps_time}>
              4:42 PM
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header