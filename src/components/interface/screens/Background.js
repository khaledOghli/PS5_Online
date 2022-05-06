import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import useInterval from 'react-useinterval';
import { useTransition, animated, config, Spring, useSpring } from 'react-spring'
import gamesList from './../../data/GamesData.json'
import classes from './Background.module.css';

const slides = gamesList;

const Background = (props) => {  
  // const [index, set] = useState(0);
  // const item = slides[index]; 
  // const increment = () => set(state => (state + 1) % slides.length);
  // useInterval(increment, 2000);
    
 
   const transitions = useTransition(slides[props.imageindex || 0], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  })

  return transitions.map(({ item, props, key }) => {
    return <animated.div
      key={key}
      className={`${classes.ps_background} lazy-background`}
      style={{ ...props, backgroundImage: `url(${item.background})` }}
    >
    {props.children}
    </animated.div>
  })


}

export default Background